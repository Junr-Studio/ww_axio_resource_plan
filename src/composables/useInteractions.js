import { reactive, computed } from 'vue';

/**
 * Composable for user interactions
 * Handles click events and tooltip management (generic for any timeline)
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
   * Handle row click event
   * @param {Object} row - The clicked row entity
   */
  const handleRowClick = (row) => {
    emit('trigger-event', {
      name: 'row-clicked',
      event: {
        rowId: row.id,
        row,
        // Legacy compatibility
        resourceId: row.id,
        resource: row,
      },
    });
  };

  /**
   * Handle item click event
   * @param {Object} item - The clicked item
   */
  const handleItemClick = (item) => {
    emit('trigger-event', {
      name: 'item-clicked',
      event: {
        itemId: item.id,
        rowId: item.row_id || item.resource_id,
        categoryId: item.category_id || item.project_id,
        item,
        // Legacy compatibility
        assignmentId: item.id,
        resourceId: item.row_id || item.resource_id,
        projectId: item.category_id || item.project_id,
        assignment: item,
      },
    });
  };

  /**
   * Show tooltip for an item
   * @param {Object} item - The item data
   * @param {MouseEvent} event - The mouse event
   */
  const showTooltip = (item, event) => {
    tooltip.visible = true;
    tooltip.data = item;
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
    handleRowClick,
    handleItemClick,
    showTooltip,
    hideTooltip,
    // Legacy exports for backwards compatibility
    handleResourceClick: handleRowClick,
    handleAssignmentClick: handleItemClick,
  };
}
