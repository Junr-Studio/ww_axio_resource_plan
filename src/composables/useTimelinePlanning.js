/**
 * Timeline Planning Composable - Orchestration Layer
 * Coordinates all specialized composables for timeline planning functionality
 * Generic structure works for: resource planning, room booking, equipment scheduling, etc.
 */

import { useTimelineData } from './useTimelineData';
import { useCapacity } from './useCapacity';
import { useAssignments } from './useAssignments';
import { useStyles } from './useStyles';
import { useInteractions } from './useInteractions';

/**
 * Main composable that orchestrates all timeline planning functionality
 * @param {Object} props - Component props
 * @param {Function} emit - Component emit function
 * @returns {Object} Combined API from all composables
 */
export function useTimelinePlanning(props, emit) {
  // ========================================
  // TIMELINE & DATA SOURCES
  // ========================================
  const {
    timelineDays,
    timelineWeeks,
    activeRows,
    activeCategories,
    activeItems,
    // Legacy compatibility
    activeResources,
    activeProjects,
    activeAssignments,
  } = useTimelineData(props);

  // ========================================
  // LOAD/CAPACITY CALCULATIONS
  // ========================================
  const {
    calculateDailyLoad,
    getDayLoadInfo,
    getLoadStatusInfo,
    // Legacy compatibility
    calculateDailyCapacity,
    getDayCapacityInfo,
    getCapacityStatusInfo,
  } = useCapacity(activeItems);

  // ========================================
  // ITEM PROCESSING & LAYOUT
  // ========================================
  const {
    getRowItems,
    getRowLaneCount,
    getItemBarStyle,
    // Legacy compatibility
    getResourceAssignments,
    getResourceLaneCount,
    getAssignmentBarStyle,
  } = useAssignments(
    activeItems,
    activeCategories,
    timelineDays,
    (rowId, item) => getLoadStatusInfo(rowId, item, timelineDays.value, props)
  );

  // ========================================
  // STYLE CALCULATIONS
  // ========================================
  const {
    containerStyle,
    rowColumnStyle,
    dayColumnStyle,
    daysContainerStyle,
    emptyStateStyle,
    getRowStyle,
    // Legacy compatibility
    resourceColumnStyle,
    getResourceRowStyle,
  } = useStyles(props, timelineDays, getRowLaneCount);

  // ========================================
  // USER INTERACTIONS
  // ========================================
  const {
    tooltip,
    tooltipStyle,
    handleRowClick,
    handleItemClick,
    showTooltip,
    hideTooltip,
    // Legacy compatibility
    handleResourceClick,
    handleAssignmentClick,
  } = useInteractions(emit);

  // ========================================
  // RETURN COMBINED PUBLIC API
  // ========================================
  return {
    // Data sources (new generic names)
    activeRows,
    activeCategories,
    activeItems,
    timelineDays,
    timelineWeeks,

    // Item functions (new generic names)
    getRowItems,
    getRowLaneCount,
    getItemBarStyle,

    // Load functions (new generic names)
    getDayLoadInfo,
    getLoadStatusInfo,

    // Style functions (new generic names)
    getRowStyle,
    containerStyle,
    rowColumnStyle,
    dayColumnStyle,
    daysContainerStyle,
    emptyStateStyle,
    tooltipStyle,

    // Event handlers (new generic names)
    handleRowClick,
    handleItemClick,
    showTooltip,
    hideTooltip,

    // Tooltip state
    tooltip,

    // ========================================
    // LEGACY COMPATIBILITY EXPORTS
    // ========================================
    activeResources,
    activeProjects,
    activeAssignments,
    getResourceAssignments,
    getResourceLaneCount,
    getDayCapacityInfo,
    getResourceRowStyle,
    getAssignmentBarStyle,
    handleResourceClick,
    handleAssignmentClick,
    resourceColumnStyle,
  };
}

// Legacy export for backwards compatibility
export { useTimelinePlanning as useResourcePlanning };
