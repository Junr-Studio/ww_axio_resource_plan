import { parseISO, differenceInDays } from 'date-fns';
import { doRangesOverlap } from '../utils/capacityHelpers';
import { ASSIGNMENT_BAR_HEIGHT, LANE_HEIGHT } from '../utils/constants';

/**
 * Composable for item processing
 * Handles lane calculation and item layout (generic for any timeline items)
 */
export function useAssignments(activeItems, activeCategories, timelineDays, getLoadStatusInfo) {
  /**
   * Get all items for a specific row with lane assignments
   * Uses a greedy algorithm to pack items into lanes without overlap
   * @param {string} rowId - The row ID
   * @returns {Array} Sorted items with lane property
   */
  const getRowItems = (rowId) => {
    const items = activeItems.value.filter((a) => a.row_id === rowId || a.resource_id === rowId);

    // Sort by start date for consistent lane assignment
    const sortedItems = [...items].sort((a, b) => {
      return new Date(a.start_date) - new Date(b.start_date);
    });

    // Assign lanes using greedy algorithm
    const lanes = [];

    sortedItems.forEach((item) => {
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
          const existingStart = parseISO(existingItem.start_date);
          const existingEnd = parseISO(existingItem.end_date);
          return doRangesOverlap(itemStart, itemEnd, existingStart, existingEnd);
        });

        if (!hasOverlap) {
          lanes[laneIndex].push(item);
          item.lane = laneIndex;
          laneFound = true;
        } else {
          laneIndex++;
        }
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
    const category = activeCategories.value.find((p) => p.id === item.category_id || p.id === item.project_id);
    const dayWidth = parseFloat(timelineDays.value[0]?.date ? '40' : '40'); // Default 40px

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
    const topPosition = lane * LANE_HEIGHT + 8;

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
