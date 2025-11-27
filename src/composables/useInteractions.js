import { reactive, computed } from 'vue';

/**
 * Composable for user interactions
 * Handles click events and tooltip management
 */
export function useInteractions(emit) {
  /**
   * Tooltip state
   */
  const tooltip = reactive({
    visible: false,
    data: {},
    x: 0,
    y: 0,
  });

  /**
   * Tooltip positioning styles
   */
  const tooltipStyle = computed(() => ({
    left: `${tooltip.x}px`,
    top: `${tooltip.y}px`,
  }));

  /**
   * Handle resource click event
   * @param {Object} resource - The clicked resource
   */
  const handleResourceClick = (resource) => {
    emit('trigger-event', {
      name: 'resource-click',
      event: { resource },
    });
  };

  /**
   * Handle assignment click event
   * @param {Object} assignment - The clicked assignment
   */
  const handleAssignmentClick = (assignment) => {
    emit('trigger-event', {
      name: 'assignment-click',
      event: { assignment },
    });
  };

  /**
   * Show tooltip for an assignment
   * @param {Object} assignment - The assignment data
   * @param {MouseEvent} event - The mouse event
   */
  const showTooltip = (assignment, event) => {
    tooltip.visible = true;
    tooltip.data = assignment;
    tooltip.x = event.clientX + 10;
    tooltip.y = event.clientY + 10;
  };

  /**
   * Hide tooltip
   */
  const hideTooltip = () => {
    tooltip.visible = false;
    tooltip.data = {};
  };

  return {
    tooltip,
    tooltipStyle,
    handleResourceClick,
    handleAssignmentClick,
    showTooltip,
    hideTooltip,
  };
}
