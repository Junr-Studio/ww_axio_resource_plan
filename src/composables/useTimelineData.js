import { computed } from 'vue';
import { addDays, format, getISOWeek, getYear, differenceInDays, parseISO, max } from 'date-fns';
import { mockResources, mockProjects, mockAssignments } from '../mockData';
import { DEFAULT_NUMBER_OF_DAYS } from '../utils/constants';

/**
 * Composable for timeline data management
 * Handles timeline days generation and mock data
 */
export function useTimelineData(props) {
  /**
   * Get assignments - either from mock data or bound data
   * Needs to be defined early so timelineDays can use it
   * Process with formula mappings for dynamic field resolution
   */
  const activeAssignments = computed(() => {
    const useMockData = props.content?.useMockData ?? false;
    const boundAssignments = props.content?.assignments;

    if (useMockData || !Array.isArray(boundAssignments) || boundAssignments.length === 0) {
      return mockAssignments;
    }

    // Use formula mapping for dynamic field resolution
    const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

    return boundAssignments.map(item => {
      const id = resolveMappingFormula(props.content?.assignmentsIdFormula, item) ?? item.id;
      const resourceId = resolveMappingFormula(props.content?.assignmentsResourceIdFormula, item) ?? item.resource_id;
      const projectId = resolveMappingFormula(props.content?.assignmentsProjectIdFormula, item) ?? item.project_id;
      const startDate = resolveMappingFormula(props.content?.assignmentsStartDateFormula, item) ?? item.start_date;
      const endDate = resolveMappingFormula(props.content?.assignmentsEndDateFormula, item) ?? item.end_date;
      const capacity = resolveMappingFormula(props.content?.assignmentsCapacityFormula, item) ?? item.capacity_percentage ?? item.capacity ?? 100;

      return {
        id: id || `assignment-${Date.now()}-${Math.random()}`,
        resource_id: resourceId,
        project_id: projectId,
        start_date: startDate,
        end_date: endDate,
        capacity_percentage: Number(capacity) || 100,
        project: item.project ?? { name: '', color: '' },
        // Include original data for reference
        originalItem: item,
      };
    });
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

  /**
   * Get resources - either from mock data or bound data
   * Process with formula mappings for dynamic field resolution
   */
  const activeResources = computed(() => {
    const useMockData = props.content?.useMockData ?? false;
    const boundResources = props.content?.resources;

    if (useMockData || !Array.isArray(boundResources) || boundResources.length === 0) {
      return mockResources;
    }

    // Use formula mapping for dynamic field resolution
    const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

    return boundResources.map(item => {
      const id = resolveMappingFormula(props.content?.resourcesIdFormula, item) ?? item.id;
      const name = resolveMappingFormula(props.content?.resourcesNameFormula, item) ?? item.name ?? `${item.first_name || ''} ${item.last_name || ''}`.trim();
      const position = resolveMappingFormula(props.content?.resourcesPositionFormula, item) ?? item.position ?? item.title;
      const avatar = resolveMappingFormula(props.content?.resourcesAvatarFormula, item) ?? item.avatar;

      return {
        id: id || `resource-${Date.now()}-${Math.random()}`,
        name: name || 'Untitled Resource',
        position: position || '',
        avatar: avatar || '',
        // Include original data for reference - allows access to ANY backend field
        originalItem: item,
      };
    });
  });

  /**
   * Get projects - either from mock data or bound data
   * Process with formula mappings for dynamic field resolution
   */
  const activeProjects = computed(() => {
    const useMockData = props.content?.useMockData ?? false;
    const boundProjects = props.content?.projects;

    if (useMockData || !Array.isArray(boundProjects) || boundProjects.length === 0) {
      return mockProjects;
    }

    // Use formula mapping for dynamic field resolution
    const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

    return boundProjects.map(item => {
      const id = resolveMappingFormula(props.content?.projectsIdFormula, item) ?? item.id;
      const name = resolveMappingFormula(props.content?.projectsNameFormula, item) ?? item.name;
      const color = resolveMappingFormula(props.content?.projectsColorFormula, item) ?? item.color ?? '#3b82f6';
      const startTargetDate = resolveMappingFormula(props.content?.projectsStartDateFormula, item) ?? item.start_target_date ?? item.start_date;
      const status = resolveMappingFormula(props.content?.projectsStatusFormula, item) ?? item.status ?? 'planned';

      return {
        id: id || `project-${Date.now()}-${Math.random()}`,
        name: name || 'Untitled Project',
        color: color,
        start_target_date: startTargetDate,
        number_of_sprints: item.number_of_sprints ?? 6,
        sprint_duration_weeks: item.sprint_duration_weeks ?? 2,
        status: status,
        sprints: item.sprints ?? [],
        // Include original data for reference
        originalItem: item,
      };
    });
  });

  return {
    timelineDays,
    timelineWeeks,
    activeResources,
    activeProjects,
    activeAssignments,
  };
}
