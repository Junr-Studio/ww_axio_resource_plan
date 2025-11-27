<template>
  <div
    ref="barRef"
    class="assignment-bar"
    :style="barStyle"
    @click="$emit('click', assignment)"
    @mouseenter="$emit('show-tooltip', assignment, $event)"
    @mouseleave="$emit('hide-tooltip')"
  >
    <div class="assignment-label" :style="labelStyle">
      {{ assignment.project?.name || 'Project' }} - {{ assignment.capacity_percentage }}%
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'AssignmentBar',
  props: {
    assignment: {
      type: Object,
      required: true,
    },
    barStyle: {
      type: Object,
      required: true,
    },
  },
  emits: ['click', 'show-tooltip', 'hide-tooltip'],
  setup() {
    const barRef = ref(null);
    const labelOffset = ref(0);

    const labelStyle = computed(() => ({
      transform: `translateX(${labelOffset.value}px)`,
    }));

    const updateLabelPosition = () => {
      if (!barRef.value) return;

      const scrollContainer = barRef.value.closest('.timeline-body');
      if (!scrollContainer) return;

      // Find the resource column to get its width
      const resourceInfo = scrollContainer.querySelector('.resource-info');
      const resourceColumnWidth = resourceInfo ? resourceInfo.offsetWidth : 200; // Fallback to 200px

      const containerRect = scrollContainer.getBoundingClientRect();
      const barRect = barRef.value.getBoundingClientRect();

      // Calculate the left edge of the visible area (after the resource column)
      const visibleLeft = containerRect.left + resourceColumnWidth;

      // Calculate how much of the bar is hidden behind the resource column
      const hiddenBehindColumn = Math.max(0, visibleLeft - barRect.left);

      // Calculate how much space is available in the bar
      const barWidth = barRect.width;
      const maxOffset = Math.max(0, barWidth - 150); // Keep some padding for the text

      // Set label offset (clamped between 0 and maxOffset)
      labelOffset.value = Math.min(hiddenBehindColumn, maxOffset);
    };

    let scrollContainer = null;

    onMounted(() => {
      if (barRef.value) {
        scrollContainer = barRef.value.closest('.timeline-body');
        if (scrollContainer) {
          scrollContainer.addEventListener('scroll', updateLabelPosition);
          updateLabelPosition();
        }
      }
    });

    onUnmounted(() => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateLabelPosition);
      }
    });

    return {
      barRef,
      labelStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.assignment-bar {
  position: absolute;
  border-radius: 4px;
  border-style: solid;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  overflow: visible; /* Changed from hidden to allow sticky positioning */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    z-index: 5;
  }
}

.assignment-label {
  font-size: 11px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  transition: transform 0.1s ease-out;
  display: inline-block;
  max-width: 100%;
}
</style>
