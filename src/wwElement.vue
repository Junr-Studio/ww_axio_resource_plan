<template>
  <div class="timeline-planning" :style="containerStyle">
    <!-- Timeline Header -->
    <TimelineHeader
      ref="headerComponent"
      :days="timelineDays"
      :weeks="timelineWeeks"
      :row-column-style="rowColumnStyle"
      :day-column-style="dayColumnStyle"
      :days-container-style="daysContainerStyle"
    />

    <!-- Timeline Rows -->
    <div
      ref="bodyScrollRef"
      class="timeline-body"
      @scroll="handleBodyScroll"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
    >
      <TimelineRow
        v-for="row in activeRows"
        :key="row.id"
        :row="row"
        :days="timelineDays"
        :items="getRowItems(row.id)"
        :row-style="getRowStyle(row.id)"
        :row-column-style="rowColumnStyle"
        :day-column-style="dayColumnStyle"
        :days-container-style="daysContainerStyle"
        :get-day-load-info="getDayLoadInfo"
        :get-item-bar-style="getItemBarStyle"
        :show-load-percentage="content?.showLoadPercentage ?? true"
        @row-click="handleRowClick"
        @item-click="handleItemClick"
        @show-tooltip="showTooltip"
        @hide-tooltip="hideTooltip"
      />

      <!-- Empty State -->
      <div v-if="activeRows.length === 0" class="empty-state" :style="emptyStateStyle">
        <p>No data to display.</p>
        <p class="hint">
          Please bind your timeline items data in the component settings.
        </p>
      </div>
    </div>

    <!-- Tooltip -->
    <ItemTooltip
      :visible="tooltip.visible"
      :data="tooltip.data"
      :tooltip-style="tooltipStyle"
      :show-load-percentage="content?.showLoadPercentage ?? true"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTimelinePlanning } from './composables/useTimelinePlanning';
import TimelineHeader from './components/TimelineHeader.vue';
import TimelineRow from './components/TimelineRow.vue';
import ItemTooltip from './components/ItemTooltip.vue';

export default {
  components: {
    TimelineHeader,
    TimelineRow,
    ItemTooltip,
  },
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // Use the main composable for all business logic
    const planning = useTimelinePlanning(props, emit);

    // Scroll sync between header and body
    const headerComponent = ref(null);
    const bodyScrollRef = ref(null);

    const handleBodyScroll = (event) => {
      try {
        const scrollLeft = event?.target?.scrollLeft ?? bodyScrollRef.value?.scrollLeft ?? 0;
        // Sync both week numbers and days containers
        if (headerComponent.value?.headerScrollRef) {
          headerComponent.value.headerScrollRef.scrollLeft = scrollLeft;
        }
        if (headerComponent.value?.daysScrollRef) {
          headerComponent.value.daysScrollRef.scrollLeft = scrollLeft;
        }
      } catch (error) {
        console.error('Scroll sync error:', error);
      }
    };

    // Drag to scroll functionality
    const isDragging = ref(false);
    const startX = ref(0);
    const startY = ref(0);
    const scrollLeftStart = ref(0);
    const scrollTopStart = ref(0);

    const handleMouseDown = (event) => {
      if (!bodyScrollRef.value) return;
      isDragging.value = true;
      startX.value = event.pageX;
      startY.value = event.pageY;
      scrollLeftStart.value = bodyScrollRef.value.scrollLeft;
      scrollTopStart.value = bodyScrollRef.value.scrollTop;
      bodyScrollRef.value.style.cursor = 'grabbing';
      bodyScrollRef.value.style.userSelect = 'none';
    };

    const handleMouseMove = (event) => {
      if (!isDragging.value || !bodyScrollRef.value) return;
      event.preventDefault();
      const deltaX = event.pageX - startX.value;
      const deltaY = event.pageY - startY.value;
      bodyScrollRef.value.scrollLeft = scrollLeftStart.value - deltaX;
      bodyScrollRef.value.scrollTop = scrollTopStart.value - deltaY;
    };

    const handleMouseUp = () => {
      if (!bodyScrollRef.value) return;
      isDragging.value = false;
      bodyScrollRef.value.style.cursor = 'grab';
      bodyScrollRef.value.style.userSelect = '';
    };

    const handleMouseLeave = () => {
      if (isDragging.value && bodyScrollRef.value) {
        isDragging.value = false;
        bodyScrollRef.value.style.cursor = 'grab';
        bodyScrollRef.value.style.userSelect = '';
      }
    };

    // Return everything needed by the template
    return {
      // Data (new generic names)
      activeRows: planning.activeRows,
      timelineDays: planning.timelineDays,
      timelineWeeks: planning.timelineWeeks,
      tooltip: planning.tooltip,

      // Functions (new generic names)
      getRowItems: planning.getRowItems,
      getRowLaneCount: planning.getRowLaneCount,
      getDayLoadInfo: planning.getDayLoadInfo,
      getRowStyle: planning.getRowStyle,
      getItemBarStyle: planning.getItemBarStyle,
      handleRowClick: planning.handleRowClick,
      handleItemClick: planning.handleItemClick,
      showTooltip: planning.showTooltip,
      hideTooltip: planning.hideTooltip,

      // Styles (new generic names)
      containerStyle: planning.containerStyle,
      rowColumnStyle: planning.rowColumnStyle,
      dayColumnStyle: planning.dayColumnStyle,
      daysContainerStyle: planning.daysContainerStyle,
      emptyStateStyle: planning.emptyStateStyle,
      tooltipStyle: planning.tooltipStyle,

      // Scroll sync
      headerComponent,
      bodyScrollRef,
      handleBodyScroll,

      // Drag to scroll
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleMouseLeave,
    };
  },
};
</script>

<style lang="scss" scoped>
.timeline-planning {
  font-family: system-ui, -apple-system, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.timeline-body {
  flex: 1;
  min-height: 0;
  overflow-x: auto;
  overflow-y: auto;
  cursor: grab;

  /* Custom scrollbar styling for Firefox */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;

  /* Custom scrollbar styling for Webkit browsers (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
    border: 2px solid #f1f5f9;

    &:hover {
      background: #94a3b8;
    }

    &:active {
      background: #64748b;
    }
  }

  &::-webkit-scrollbar-corner {
    background: #f1f5f9;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #9ca3af;
  padding: 32px;

  p {
    margin: 0;
    font-size: 14px;
  }

  .hint {
    font-size: 12px;
    color: #d1d5db;
  }
}
</style>
