import { computed } from 'vue';
import { addDays, format, getISOWeek, getYear, differenceInDays, parseISO, max } from 'date-fns';
import { mockResources, mockProjects, mockAssignments } from '../mockData';
import { DEFAULT_NUMBER_OF_DAYS } from '../utils/constants';
import { assignProjectColors, getProjectColor } from '../utils/colorHelpers';

/**
 * Composable for timeline data management
 * Handles joined assignments data with nested resource/project objects
 */
export function useTimelineData(props) {
  /**
   * Get assignments - either from mock data or bound data
   * Now expects assignments with nested resource and project objects
   */
  const activeAssignments = computed(() => {
    const useMockData = props.content?.useMockData ?? false;
    const boundAssignments = props.content?.assignments;

    if (useMockData || !Array.isArray(boundAssignments) || boundAssignments.length === 0) {
      return mockAssignments;
    }

    return boundAssignments.map(item => {
      // Extract nested resource object
      const resource = item.resource || {};
      const resourceId = resource.id || item.resource_id || `resource-${Date.now()}-${Math.random()}`;

      // Extract nested project object
      const project = item.project || {};
      const projectId = project.id || item.project_id || `project-${Date.now()}-${Math.random()}`;

      // Parse dates
      const startDate = item.assignement_start_date || item.start_date || '';
      const endDate = item.assignement_end_date || item.end_date || '';

      // Convert capacity: if decimal (0-1), multiply by 100; if already percentage (0-100), use as-is
      const capacityRaw = item.assigned_capacity || item.capacity_percentage || item.capacity || 1;
      const capacityNum = Number(capacityRaw);
      const capacity = capacityNum <= 1 ? capacityNum * 100 : capacityNum;

      return {
        id: item.id || `assignment-${Date.now()}-${Math.random()}`,
        resource_id: resourceId,
        project_id: projectId,
        start_date: startDate,
        end_date: endDate,
        capacity_percentage: capacity || 100,
        // Keep project data for display (color will be assigned later)
        project: {
          id: projectId,
          name: project.title || project.name || 'Untitled Project',
          color: project.color, // Can be null, will be assigned later
          status: project.status || 'planned',
        },
        // Include original nested data for reference
        originalItem: item,
      };
    });
  });

  /**
   * Extract unique resources from assignments
   * Creates resource rows for the timeline
   */
  const activeResources = computed(() => {
    const useMockData = props.content?.useMockData ?? false;

    if (useMockData) {
      return mockResources;
    }

    const assignments = activeAssignments.value;
    if (!assignments || assignments.length === 0) return [];

    // Create a map to deduplicate resources
    const resourceMap = new Map();

    assignments.forEach(assignment => {
      const resource = assignment.originalItem?.resource;
      if (!resource?.id) return;

      // Only add if not already in map
      if (!resourceMap.has(resource.id)) {
        const name = `${resource.first_name || ''} ${resource.last_name || ''}`.trim() || resource.name || 'Untitled Resource';

        resourceMap.set(resource.id, {
          id: resource.id,
          name: name,
          position: resource.title || resource.position || '',
          avatar: resource.avatar || '',
          originalItem: resource,
        });
      }
    });

    return Array.from(resourceMap.values());
  });

  /**
   * Extract unique projects from assignments and assign colors
   * Projects with null colors get unique generated colors
   */
  const activeProjects = computed(() => {
    const useMockData = props.content?.useMockData ?? false;

    if (useMockData) {
      return mockProjects;
    }

    const assignments = activeAssignments.value;
    if (!assignments || assignments.length === 0) return [];

    // Create a map to deduplicate projects
    const projectMap = new Map();

    assignments.forEach(assignment => {
      const project = assignment.originalItem?.project;
      if (!project?.id) return;

      // Only add if not already in map
      if (!projectMap.has(project.id)) {
        projectMap.set(project.id, {
          id: project.id,
          name: project.title || project.name || 'Untitled Project',
          color: project.color, // Can be null
          status: project.status || 'planned',
          originalItem: project,
        });
      }
    });

    const projects = Array.from(projectMap.values());

    // Assign colors to projects (null colors get generated colors)
    const colorMap = assignProjectColors(projects);

    // Update projects with assigned colors
    return projects.map(project => ({
      ...project,
      color: getProjectColor(project.id, colorMap),
    }));
  });

  /**
   * Get project color map for assignments
   */
  const projectColorMap = computed(() => {
    const colorMap = new Map();
    activeProjects.value.forEach(project => {
      colorMap.set(project.id, project.color);
    });
    return colorMap;
  });

  /**
   * Update assignments with resolved project colors
   */
  const assignmentsWithColors = computed(() => {
    return activeAssignments.value.map(assignment => ({
      ...assignment,
      project: {
        ...assignment.project,
        color: getProjectColor(assignment.project_id, projectColorMap.value),
      },
    }));
  });

  /**
   * Calculate the number of days needed to show all assignments
   * Returns the number of days from today to the last assignment's end date
   */
  const calculateRequiredDays = () => {
    const assignments = activeAssignments.value;
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    console.log('📊 Calculating required days:', {
      assignmentCount: assignments?.length,
      startDate: format(startDate, 'yyyy-MM-dd')
    });

    if (!assignments || assignments.length === 0) {
      console.log('⚠️ No assignments found, using default:', DEFAULT_NUMBER_OF_DAYS);
      return DEFAULT_NUMBER_OF_DAYS;
    }

    // Find the latest end date from all assignments
    const endDates = assignments
      .map(a => {
        try {
          const date = typeof a.end_date === 'string' ? parseISO(a.end_date) : a.end_date;
          console.log(`  Assignment ${a.id}: ${a.end_date} → ${date ? format(date, 'yyyy-MM-dd') : 'INVALID'}`);
          return date;
        } catch (e) {
          console.log(`  Assignment ${a.id}: ${a.end_date} → ERROR: ${e.message}`);
          return null;
        }
      })
      .filter(date => date !== null && date instanceof Date && !isNaN(date));

    console.log(`📅 Valid end dates found: ${endDates.length}/${assignments.length}`);

    if (endDates.length === 0) {
      console.log('⚠️ No valid end dates, using default:', DEFAULT_NUMBER_OF_DAYS);
      return DEFAULT_NUMBER_OF_DAYS;
    }

    const latestEndDate = max(endDates);
    const daysDiff = differenceInDays(latestEndDate, startDate);
    const requiredDays = Math.max(daysDiff + 7, DEFAULT_NUMBER_OF_DAYS);

    console.log('✨ Calculation result:', {
      latestEndDate: format(latestEndDate, 'yyyy-MM-dd'),
      daysDiff,
      buffer: 7,
      requiredDays,
      usingDefault: requiredDays === DEFAULT_NUMBER_OF_DAYS
    });

    // Add a buffer of 7 days after the last assignment, and ensure minimum of DEFAULT_NUMBER_OF_DAYS
    return requiredDays;
  };

  /**
   * Generate array of timeline days based on configuration or assignment data
   */
  const timelineDays = computed(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Use manual numberOfDays if specified, otherwise calculate from assignments
    const numberOfDays = props.content?.numberOfDays || calculateRequiredDays();

    console.log('🗓️ Timeline calculation:', {
      numberOfDays,
      startDate: format(startDate, 'yyyy-MM-dd'),
      assignmentCount: activeAssignments.value?.length
    });

    const days = [];
    for (let i = 0; i < numberOfDays; i++) {
      const dayDate = addDays(startDate, i);
      days.push({
        dayKey: format(dayDate, 'yyyy-MM-dd'),
        dayOfWeek: format(dayDate, 'EEE'),
        dayNumber: format(dayDate, 'd'),
        monthYear: format(dayDate, 'MMM yyyy'),
        weekNumber: getISOWeek(dayDate),
        year: getYear(dayDate),
        date: dayDate,
      });
    }

    console.log(`✅ Generated ${days.length} days from ${days[0]?.dayKey} to ${days[days.length - 1]?.dayKey}`);

    return days;
  });

  /**
   * Group timeline days by week for week number headers
   * Returns array of week objects with start/end indices and day count
   */
  const timelineWeeks = computed(() => {
    const days = timelineDays.value;
    if (days.length === 0) return [];

    const weeks = [];
    let currentWeek = null;
    let startIndex = 0;

    days.forEach((day, index) => {
      const weekKey = `${day.year}-W${day.weekNumber}`;

      if (currentWeek !== weekKey) {
        // Start a new week
        if (currentWeek !== null) {
          // Close previous week
          weeks.push({
            weekNumber: days[startIndex].weekNumber,
            year: days[startIndex].year,
            startIndex: startIndex,
            endIndex: index - 1,
            dayCount: index - startIndex,
          });
        }
        currentWeek = weekKey;
        startIndex = index;
      }
    });

    // Close the last week
    if (currentWeek !== null) {
      weeks.push({
        weekNumber: days[startIndex].weekNumber,
        year: days[startIndex].year,
        startIndex: startIndex,
        endIndex: days.length - 1,
        dayCount: days.length - startIndex,
      });
    }

    return weeks;
  });

  return {
    timelineDays,
    timelineWeeks,
    activeResources,
    activeProjects,
    activeAssignments: assignmentsWithColors, // Return assignments with resolved colors
  };
}
