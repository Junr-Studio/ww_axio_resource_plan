import { parseISO, differenceInDays } from 'date-fns';
import { doRangesOverlap } from '../utils/capacityHelpers';
import { ASSIGNMENT_BAR_HEIGHT, LANE_HEIGHT } from '../utils/constants';

/**
 * Composable for item processing
 * Handles lane calculation and item layout (generic for any timeline items)
 */
export function useAssignments(activeItems, activeCategories, timelineDays, getLoadStatusInfo, props) {
  /**
   * Get all items for a specific row with lane assignments
   * Uses a greedy algorithm to pack items into lanes without overlap
   * @param {string} rowId - The row ID
   * @returns {Array} Sorted items with lane property
   */
  const getRowItems = (rowId) => {
    if (!rowId || !activeItems.value || !Array.isArray(activeItems.value)) return [];

    const items = activeItems.value.filter((a) => a?.row_id === rowId || a?.resource_id === rowId);

    // Sort by start date for consistent lane assignment
    const sortedItems = [...items].sort((a, b) => {
      const dateA = a?.start_date ? new Date(a.start_date) : new Date(0);
      const dateB = b?.start_date ? new Date(b.start_date) : new Date(0);
      return dateA - dateB;
    });

    // Assign lanes using greedy algorithm
    const lanes = [];

    sortedItems.forEach((item) => {
      if (!item?.start_date || !item?.end_date) return;

      try {
        const itemStart = parseISO(item.start_date);
        const itemEnd = parseISO(item.end_date);

        let laneIndex = 0;
        let laneFound = false;

        // Try to find a lane where this item doesn't overlap
        while (!laneFound) {
          if (!lanes[laneIndex]) {
            lanes[laneIndex] = [];
          }

          const hasOverlap = lanes[laneIndex].some((existingItem) => {
            if (!existingItem?.start_date || !existingItem?.end_date) return false;
            try {
              const existingStart = parseISO(existingItem.start_date);
              const existingEnd = parseISO(existingItem.end_date);
              return doRangesOverlap(itemStart, itemEnd, existingStart, existingEnd);
            } catch (error) {
              return false;
            }
          });

          if (!hasOverlap) {
            lanes[laneIndex].push(item);
            item.lane = laneIndex;
            laneFound = true;
          } else {
            laneIndex++;
          }
        }
      } catch (error) {
        // Skip items with invalid dates
        return;
      }
    });

    return sortedItems;
  };

  /**
   * Get the number of lanes needed for a row
   * @param {string} rowId - The row ID
   * @returns {number} Number of lanes
   */
  const getRowLaneCount = (rowId) => {
    const items = getRowItems(rowId);
    if (items.length === 0) return 1;

    const maxLane = Math.max(...items.map((a) => a.lane || 0));
    return maxLane + 1;
  };

  /**
   * Calculate the visual position and size of an item bar
   * @param {Object} item - The item object
   * @param {string} rowId - The row ID
   * @returns {Object} Style object with position and dimensions
   */
  const getItemBarStyle = (item, rowId) => {
    if (!item?.start_date || !item?.end_date) {
      return {
        left: '0px',
        width: '0px',
        top: '0px',
        height: '0px',
        display: 'none',
      };
    }

    try {
      const category = activeCategories.value?.find((p) => p?.id === item?.category_id || p?.id === item?.project_id);
      // Get dayWidth from timelineDays data or default to 40
      const dayWidth = parseFloat(timelineDays.value?.[0]?.width || '40');

      const startDate = parseISO(item.start_date);
      const endDate = parseISO(item.end_date);
      const today = new Date();
      const timelineStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      // Calculate position from timeline start
      const daysFromStart = differenceInDays(startDate, timelineStart);
      const duration = differenceInDays(endDate, startDate);

      const leftPosition = daysFromStart * dayWidth;
      const width = duration * dayWidth;

      // Lane positioning
      const lane = item.lane || 0;
      const DAY_LOAD_FOOTER_HEIGHT = 18; // Height of the footer in DayCell
      const showLoadPercentage = props?.content?.showLoadPercentage ?? true;

      // When footer is hidden, add half its height to recenter lanes vertically
      const footerOffset = showLoadPercentage ? 0 : DAY_LOAD_FOOTER_HEIGHT / 2;
      const topPosition = lane * LANE_HEIGHT + 8 + footerOffset;

      // Get load status for border styling
      const loadInfo = getLoadStatusInfo(rowId, item);

      // Styling
      const backgroundColor = category?.color || '#3b82f6';

      return {
        left: `${leftPosition}px`,
        width: `${width}px`,
        top: `${topPosition}px`,
        height: `${ASSIGNMENT_BAR_HEIGHT}px`,
        backgroundColor,
        borderColor: loadInfo.color,
        borderWidth: loadInfo.borderWidth,
      };
    } catch (error) {
      // Return safe default for invalid dates
      return {
        left: '0px',
        width: '0px',
        top: '0px',
        height: '0px',
        display: 'none',
      };
    }
  };

  return {
    getRowItems,
    getRowLaneCount,
    getItemBarStyle,
    // Legacy exports for backwards compatibility
    getResourceAssignments: getRowItems,
    getResourceLaneCount: getRowLaneCount,
    getAssignmentBarStyle: getItemBarStyle,
  };
}
