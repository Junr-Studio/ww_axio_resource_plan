<template>
  <div class="resource-planning-timeline" :style="containerStyle">
    <!-- Timeline Header -->
    <TimelineHeader
      ref="headerComponent"
      :days="timelineDays"
      :weeks="timelineWeeks"
      :resource-column-style="resourceColumnStyle"
      :day-column-style="dayColumnStyle"
      :days-container-style="daysContainerStyle"
    />

    <!-- Resource Rows -->
    <div
      ref="bodyScrollRef"
      class="timeline-body"
      @scroll="handleBodyScroll"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
    >
      <ResourceRow
        v-for="resource in activeResources"
        :key="resource.id"
        :resource="resource"
        :days="timelineDays"
        :assignments="getResourceAssignments(resource.id)"
        :row-style="getResourceRowStyle(resource.id)"
        :resource-column-style="resourceColumnStyle"
        :day-column-style="dayColumnStyle"
        :days-container-style="daysContainerStyle"
        :get-day-capacity-info="getDayCapacityInfo"
        :get-assignment-bar-style="getAssignmentBarStyle"
        @resource-click="handleResourceClick"
        @assignment-click="handleAssignmentClick"
        @show-tooltip="showTooltip"
        @hide-tooltip="hideTooltip"
      />

      <!-- Empty State -->
      <div v-if="activeResources.length === 0" class="empty-state" :style="emptyStateStyle">
        <p>No resources to display.</p>
        <p v-if="!content?.useMockData" class="hint">
          Enable "Use Mock Data" in settings or bind resource data.
        </p>
      </div>
    </div>

    <!-- Tooltip -->
    <AssignmentTooltip
      :visible="tooltip.visible"
      :data="tooltip.data"
      :tooltip-style="tooltipStyle"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useResourcePlanning } from './composables/useResourcePlanning';
import TimelineHeader from './components/TimelineHeader.vue';
import ResourceRow from './components/ResourceRow.vue';
import AssignmentTooltip from './components/AssignmentTooltip.vue';

export default {
  components: {
    TimelineHeader,
    ResourceRow,
    AssignmentTooltip,
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
    const planning = useResourcePlanning(props, emit);

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
      // Data
      activeResources: planning.activeResources,
      timelineDays: planning.timelineDays,
      timelineWeeks: planning.timelineWeeks,
      tooltip: planning.tooltip,

      // Functions
      getResourceAssignments: planning.getResourceAssignments,
      getResourceLaneCount: planning.getResourceLaneCount,
      getRemainingCapacity: planning.getRemainingCapacity,
      getDayCapacityInfo: planning.getDayCapacityInfo,
      getResourceRowStyle: planning.getResourceRowStyle,
      getAssignmentBarStyle: planning.getAssignmentBarStyle,
      handleResourceClick: planning.handleResourceClick,
      handleAssignmentClick: planning.handleAssignmentClick,
      showTooltip: planning.showTooltip,
      hideTooltip: planning.hideTooltip,

      // Styles
      containerStyle: planning.containerStyle,
      resourceColumnStyle: planning.resourceColumnStyle,
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
.resource-planning-timeline {
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
