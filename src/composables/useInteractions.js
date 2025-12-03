import { ref, computed } from 'vue';

/**
 * Composable for user interactions
 * Handles click events and tooltip management (generic for any timeline)
 */
export function useInteractions(emit) {
  /**
   * Tooltip state - using ref instead of reactive for better reactivity
   */
  const tooltipVisible = ref(false);
  const tooltipData = ref({});
  const tooltipX = ref(0);
  const tooltipY = ref(0);

  /**
   * Tooltip object for template compatibility
   */
  const tooltip = computed(() => ({
    visible: tooltipVisible.value,
    data: tooltipData.value,
    x: tooltipX.value,
    y: tooltipY.value,
  }));

  /**
   * Tooltip positioning styles
   */
  const tooltipStyle = computed(() => ({
    left: `${tooltipX.value}px`,
    top: `${tooltipY.value}px`,
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
   * Handle row hover event
   * @param {Object} row - The hovered row entity
   */
  const handleRowHover = (row) => {
    emit('trigger-event', {
      name: 'row-hovered',
      event: {
        rowId: row?.id || '',
        row: row || {},
      },
    });
  };

  /**
   * Handle item hover event
   * @param {Object} item - The hovered item
   */
  const handleItemHover = (item) => {
    emit('trigger-event', {
      name: 'item-hovered',
      event: {
        itemId: item?.id || '',
        rowId: item?.row_id || item?.resource_id || '',
        categoryId: item?.category_id || item?.project_id || '',
        item: item || {},
      },
    });
  };

  /**
   * Handle day cell click event
   * @param {Object} data - The day cell data
   */
  const handleDayClick = (data) => {
    emit('trigger-event', {
      name: 'day-clicked',
      event: {
        date: data?.date || '',
        dayKey: data?.key || '',
        rowId: data?.rowId || '',
        load: data?.load || 0,
      },
    });
  };

  /**
   * Show tooltip for an item
   * @param {Object} item - The item data
   * @param {MouseEvent} event - The mouse event
   */
  const showTooltip = (item, event) => {
    tooltipVisible.value = true;
    tooltipData.value = item || {};
    tooltipX.value = event?.clientX ? event.clientX + 10 : 0;
    tooltipY.value = event?.clientY ? event.clientY + 10 : 0;
  };

  /**
   * Hide tooltip
   */
  const hideTooltip = () => {
    tooltipVisible.value = false;
    tooltipData.value = {};
  };

  return {
    tooltip,
    tooltipStyle,
    handleRowClick,
    handleItemClick,
    handleRowHover,
    handleItemHover,
    handleDayClick,
    showTooltip,
    hideTooltip,
    // Legacy exports for backwards compatibility
    handleResourceClick: handleRowClick,
    handleAssignmentClick: handleItemClick,
  };
}
