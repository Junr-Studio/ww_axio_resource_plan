import { computed } from 'vue';
import {
  DEFAULT_DAY_WIDTH,
  DEFAULT_RESOURCE_WIDTH,
  DEFAULT_BG_COLOR,
  DEFAULT_HEADER_BG_COLOR,
  DEFAULT_BORDER_COLOR,
  DEFAULT_TEXT_COLOR,
  LANE_HEIGHT,
  ROW_FOOTER_HEIGHT,
  MIN_ROW_HEIGHT,
  ROW_PADDING,
} from '../utils/constants';

/**
 * Composable for style calculations
 * Handles all CSS and style computations (generic for any timeline)
 */
export function useStyles(props, timelineDays, getRowLaneCount) {
  /**
   * Main container styles
   */
  const containerStyle = computed(() => ({
    '--bg-color': props.content?.backgroundColor || DEFAULT_BG_COLOR,
    '--header-bg-color': props.content?.headerBackgroundColor || DEFAULT_HEADER_BG_COLOR,
    '--border-color': props.content?.borderColor || DEFAULT_BORDER_COLOR,
    '--text-color': props.content?.textColor || DEFAULT_TEXT_COLOR,
    '--day-width': props.content?.dayColumnWidth || DEFAULT_DAY_WIDTH,
  }));

  /**
   * Row column (left sticky column) styles
   */
  const rowColumnStyle = computed(() => ({
    width: props.content?.resourceColumnWidth || DEFAULT_RESOURCE_WIDTH,
    minWidth: props.content?.resourceColumnWidth || DEFAULT_RESOURCE_WIDTH,
  }));

  /**
   * Individual day column styles
   */
  const dayColumnStyle = computed(() => ({
    width: props.content?.dayColumnWidth || DEFAULT_DAY_WIDTH,
    minWidth: props.content?.dayColumnWidth || DEFAULT_DAY_WIDTH,
  }));

  /**
   * Days container (scrollable area) styles
   */
  const daysContainerStyle = computed(() => {
    const dayCount = timelineDays.value.length;
    const dayWidth = props.content?.dayColumnWidth || DEFAULT_DAY_WIDTH;
    const totalWidth = `calc(${dayWidth} * ${dayCount})`;

    return {
      width: totalWidth,
      minWidth: totalWidth,
    };
  });

  /**
   * Empty state (no rows) styles
   */
  const emptyStateStyle = computed(() => ({
    minHeight: '200px',
  }));

  /**
   * Row styles with dynamic height based on lane count
   * @param {string} rowId - The row ID
   * @returns {Object} Style object for the row
   */
  const getRowStyle = (rowId) => {
    const laneCount = getRowLaneCount(rowId);
    const calculatedHeight = laneCount * LANE_HEIGHT + ROW_PADDING + ROW_FOOTER_HEIGHT;
    const height = Math.max(MIN_ROW_HEIGHT, calculatedHeight);

    return {
      height: `${height}px`,
      minHeight: `${height}px`,
    };
  };

  return {
    containerStyle,
    rowColumnStyle,
    dayColumnStyle,
    daysContainerStyle,
    emptyStateStyle,
    getRowStyle,
    // Legacy exports for backwards compatibility
    resourceColumnStyle: rowColumnStyle,
    getResourceRowStyle: getRowStyle,
  };
}
