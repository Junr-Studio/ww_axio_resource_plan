<template>
  <div class="day-cell" :style="dayColumnStyle">
    <div class="day-cell-content"></div>
    <div v-if="showLoadPercentage" class="day-load-footer" :class="loadInfo?.cssClass">
      <span class="day-load-text">{{ loadInfo?.capacity || 0 }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayCell',
  props: {
    day: {
      type: Object,
      required: true,
    },
    loadInfo: {
      type: Object,
      required: false,
      default: () => ({ capacity: 0, cssClass: '' }),
    },
    dayColumnStyle: {
      type: Object,
      default: () => ({}),
    },
    showLoadPercentage: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.day-cell {
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;
  flex-grow: 0;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.day-cell-content {
  flex: 1;
  position: relative;
}

.day-load-footer {
  height: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(0, 0, 0, 0.03);
  background: rgba(0, 0, 0, 0.01);
  z-index: 2;
  pointer-events: none;
  flex-shrink: 0;
}

.day-load-text {
  font-size: 9px;
  font-weight: 500;
  color: #9ca3af;
  user-select: none;
}

.day-load-footer.capacity-full {
  background: rgba(239, 68, 68, 0.1);
  border-top-color: rgba(239, 68, 68, 0.15);

  .day-load-text {
    color: #dc2626;
    font-weight: 600;
  }
}

.day-load-footer.capacity-high {
  background: rgba(245, 158, 11, 0.08);
  border-top-color: rgba(245, 158, 11, 0.12);

  .day-load-text {
    color: #ea580c;
    font-weight: 600;
  }
}

.day-load-footer.capacity-medium {
  background: rgba(234, 179, 8, 0.06);
  border-top-color: rgba(234, 179, 8, 0.1);

  .day-load-text {
    color: #ca8a04;
    font-weight: 600;
  }
}
</style>
