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
   */
  const activeAssignments = computed(() => {
    const useMockData = props.content?.useMockData ?? true;
    const boundAssignments = props.content?.assignments;

    if (useMockData || !boundAssignments || boundAssignments.length === 0) {
      return mockAssignments;
    }

    return boundAssignments;
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
   */
  const activeResources = computed(() => {
    const useMockData = props.content?.useMockData ?? true;
    const boundResources = props.content?.resources;

    if (useMockData || !boundResources || boundResources.length === 0) {
      return mockResources;
    }

    return boundResources;
  });

  /**
   * Get projects - either from mock data or bound data
   */
  const activeProjects = computed(() => {
    const useMockData = props.content?.useMockData ?? true;
    const boundProjects = props.content?.projects;

    if (useMockData || !boundProjects || boundProjects.length === 0) {
      return mockProjects;
    }

    return boundProjects;
  });

  return {
    timelineDays,
    timelineWeeks,
    activeResources,
    activeProjects,
    activeAssignments,
  };
}
