/**
 * Resource Planning Composable - Orchestration Layer
 * Coordinates all specialized composables for resource planning functionality
 */

import { useTimelineData } from './useTimelineData';
import { useCapacity } from './useCapacity';
import { useAssignments } from './useAssignments';
import { useStyles } from './useStyles';
import { useInteractions } from './useInteractions';

/**
 * Main composable that orchestrates all resource planning functionality
 * @param {Object} props - Component props
 * @param {Function} emit - Component emit function
 * @returns {Object} Combined API from all composables
 */
export function useResourcePlanning(props, emit) {
  // ========================================
  // TIMELINE & DATA SOURCES
  // ========================================
  const {
    timelineDays,
    timelineWeeks,
    activeResources,
    activeProjects,
    activeAssignments,
  } = useTimelineData(props);

  // ========================================
  // CAPACITY CALCULATIONS
  // ========================================
  const {
    calculateDailyCapacity,
    getDayCapacityInfo,
    getCapacityStatusInfo,
  } = useCapacity(activeAssignments);

  // ========================================
  // ASSIGNMENT PROCESSING & LAYOUT
  // ========================================
  const {
    getResourceAssignments,
    getResourceLaneCount,
    getAssignmentBarStyle,
  } = useAssignments(
    activeAssignments,
    activeProjects,
    timelineDays,
    (resourceId, assignment) => getCapacityStatusInfo(resourceId, assignment, timelineDays.value, props)
  );

  // ========================================
  // STYLE CALCULATIONS
  // ========================================
  const {
    containerStyle,
    resourceColumnStyle,
    dayColumnStyle,
    daysContainerStyle,
    emptyStateStyle,
    getResourceRowStyle,
  } = useStyles(props, timelineDays, getResourceLaneCount);

  // ========================================
  // USER INTERACTIONS
  // ========================================
  const {
    tooltip,
    tooltipStyle,
    handleResourceClick,
    handleAssignmentClick,
    showTooltip,
    hideTooltip,
  } = useInteractions(emit);

  // ========================================
  // RETURN COMBINED PUBLIC API
  // ========================================
  return {
    // Data sources
    activeResources,
    timelineDays,
    timelineWeeks,

    // Assignment functions
    getResourceAssignments,
    getResourceLaneCount,

    // Capacity functions
    getDayCapacityInfo,

    // Style functions
    getResourceRowStyle,
    getAssignmentBarStyle,
    containerStyle,
    resourceColumnStyle,
    dayColumnStyle,
    daysContainerStyle,
    emptyStateStyle,
    tooltipStyle,

    // Event handlers
    handleResourceClick,
    handleAssignmentClick,
    showTooltip,
    hideTooltip,

    // Tooltip state
    tooltip,
  };
}
