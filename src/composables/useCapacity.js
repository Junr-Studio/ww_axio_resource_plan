import { parseISO } from 'date-fns';
import { getCapacityInfo, isDateInRange } from '../utils/capacityHelpers';

/**
 * Composable for capacity calculations
 * Handles per-day and per-resource capacity calculations
 */
export function useCapacity(activeAssignments) {
  /**
   * Calculate total capacity for a specific resource on a specific date
   * @param {string} resourceId - The resource ID
   * @param {Date} date - The date to calculate capacity for
   * @returns {number} Total capacity percentage for that resource on that date
   */
  const calculateDailyCapacity = (resourceId, date) => {
    const resourceAssignments = activeAssignments.value.filter(
      (a) => a.resource_id === resourceId
    );

    let totalCapacity = 0;

    resourceAssignments.forEach((assignment) => {
      const assignmentStart = parseISO(assignment.start_date);
      const assignmentEnd = parseISO(assignment.end_date);

      // Check if this day falls within the assignment period [start, end)
      if (isDateInRange(date, assignmentStart, assignmentEnd)) {
        totalCapacity += assignment.capacity_percentage || 0;
      }
    });

    return totalCapacity;
  };

  /**
   * Get capacity info (percentage + CSS class) for a specific day
   * @param {string} resourceId - The resource ID
   * @param {Date} date - The date to get info for
   * @returns {Object} Object with capacity and cssClass properties
   */
  const getDayCapacityInfo = (resourceId, date) => {
    const usedCapacity = calculateDailyCapacity(resourceId, date);
    return getCapacityInfo(usedCapacity);
  };

  /**
   * Get capacity status info for assignment border styling
   * Checks max capacity across all days this assignment spans
   * @param {string} resourceId - The resource ID
   * @param {Object} assignment - The assignment object
   * @param {Array} timelineDays - Array of timeline day objects
   * @param {Object} props - Component props for color configuration
   * @returns {Object} { color, borderWidth, showBorder }
   */
  const getCapacityStatusInfo = (resourceId, assignment, timelineDays, props) => {
    const assignmentStart = parseISO(assignment.start_date);
    const assignmentEnd = parseISO(assignment.end_date);

    // Check capacity for each day this assignment spans
    let maxCapacity = 0;
    timelineDays.forEach((day) => {
      // Check if this day falls within the assignment period
      if (isDateInRange(day.date, assignmentStart, assignmentEnd)) {
        const capacity = calculateDailyCapacity(resourceId, day.date);
        if (capacity > maxCapacity) {
          maxCapacity = capacity;
        }
      }
    });

    // Return border info based on max capacity
    if (maxCapacity > 100) {
      return {
        color: props.content?.colorOverCapacity || '#ef4444',
        borderWidth: '1px',
        showBorder: true,
      };
    } else if (maxCapacity >= 80) {
      return {
        color: props.content?.colorNearFull || '#f59e0b',
        borderWidth: '1px',
        showBorder: true,
      };
    } else {
      return {
        color: 'transparent',
        borderWidth: '0px',
        showBorder: false,
      };
    }
  };

  return {
    calculateDailyCapacity,
    getDayCapacityInfo,
    getCapacityStatusInfo,
  };
}
