import { parseISO } from 'date-fns';
import { getCapacityInfo, isDateInRange } from '../utils/capacityHelpers';

/**
 * Composable for load/capacity calculations
 * Handles per-day and per-row load calculations (generic for any timeline)
 */
export function useCapacity(activeItems) {
  /**
   * Calculate total load for a specific row on a specific date
   * @param {string} rowId - The row ID
   * @param {Date} date - The date to calculate load for
   * @returns {number} Total load percentage for that row on that date
   */
  const calculateDailyLoad = (rowId, date) => {
    if (!rowId || !date || !activeItems.value) return 0;

    const rowItems = activeItems.value.filter(
      (a) => a?.row_id === rowId || a?.resource_id === rowId
    );

    let totalLoad = 0;

    rowItems.forEach((item) => {
      if (!item?.start_date || !item?.end_date) return;

      try {
        const itemStart = parseISO(item.start_date);
        const itemEnd = parseISO(item.end_date);

        // Check if this day falls within the item period [start, end)
        if (isDateInRange(date, itemStart, itemEnd)) {
          totalLoad += item?.load_percentage || item?.capacity_percentage || 0;
        }
      } catch (error) {
        // Skip items with invalid dates
        return;
      }
    });

    return totalLoad;
  };

  /**
   * Get load info (percentage + CSS class) for a specific day
   * @param {string} rowId - The row ID
   * @param {Date} date - The date to get info for
   * @returns {Object} Object with capacity and cssClass properties
   */
  const getDayLoadInfo = (rowId, date) => {
    if (!rowId || !date) {
      return { capacity: 0, cssClass: '' };
    }
    const usedLoad = calculateDailyLoad(rowId, date);
    return getCapacityInfo(usedLoad);
  };

  /**
   * Get load status info for item border styling
   * Checks max load across all days this item spans
   * @param {string} rowId - The row ID
   * @param {Object} item - The item object
   * @param {Array} timelineDays - Array of timeline day objects
   * @param {Object} props - Component props for color configuration
   * @returns {Object} { color, borderWidth, showBorder }
   */
  const getLoadStatusInfo = (rowId, item, timelineDays, props) => {
    if (!rowId || !item?.start_date || !item?.end_date || !timelineDays || !props) {
      return {
        color: 'transparent',
        borderWidth: '0px',
        showBorder: false,
      };
    }

    try {
      const itemStart = parseISO(item.start_date);
      const itemEnd = parseISO(item.end_date);

      // Check load for each day this item spans
      let maxLoad = 0;
      timelineDays.forEach((day) => {
        if (!day?.date) return;
        // Check if this day falls within the item period
        if (isDateInRange(day.date, itemStart, itemEnd)) {
          const load = calculateDailyLoad(rowId, day.date);
          if (load > maxLoad) {
            maxLoad = load;
          }
        }
      });

      // Return border info based on max load
      if (maxLoad > 100) {
        return {
          color: props.content?.colorHighLoad || props.content?.colorOverCapacity || '#ef4444',
          borderWidth: '1px',
          showBorder: true,
        };
      } else if (maxLoad >= 80) {
        return {
          color: props.content?.colorMediumLoad || props.content?.colorNearFull || '#f59e0b',
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
    } catch (error) {
      // Return safe default for invalid dates
      return {
        color: 'transparent',
        borderWidth: '0px',
        showBorder: false,
      };
    }
  };

  return {
    calculateDailyLoad,
    getDayLoadInfo,
    getLoadStatusInfo,
    // Legacy exports for backwards compatibility
    calculateDailyCapacity: calculateDailyLoad,
    getDayCapacityInfo: getDayLoadInfo,
    getCapacityStatusInfo: getLoadStatusInfo,
  };
}
