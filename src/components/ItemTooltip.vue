<template>
  <div v-if="visible" class="item-tooltip" :style="tooltipStyle">
    <div class="tooltip-title">{{ data.project?.name || data.category?.name }}</div>
    <div v-if="showLoadPercentage" class="tooltip-row">
      <span class="tooltip-label">Load:</span>
      <span class="tooltip-value">{{ data.capacity_percentage || data.load_percentage }}%</span>
    </div>
    <div class="tooltip-row">
      <span class="tooltip-label">Period:</span>
      <span class="tooltip-value">{{ formatDate(data.start_date) }} - {{ formatDate(data.end_date) }}</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../utils/dateHelpers';

export default {
  name: 'ItemTooltip',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    tooltipStyle: {
      type: Object,
      default: () => ({}),
    },
    showLoadPercentage: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.item-tooltip {
  position: fixed;
  background: #1f2937;
  color: white;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: none;
  min-width: 200px;
  font-size: 13px;
}

.tooltip-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 4px;
}

.tooltip-label {
  color: #9ca3af;
}

.tooltip-value {
  font-weight: 500;
}
</style>
