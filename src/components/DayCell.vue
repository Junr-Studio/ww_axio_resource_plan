<template>
  <div class="day-cell" :style="dayColumnStyle">
    <div class="day-cell-content"></div>
    <div class="day-capacity-footer" :class="capacityInfo.cssClass">
      <span class="day-capacity-text">{{ capacityInfo.capacity }}%</span>
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
    capacityInfo: {
      type: Object,
      required: true,
    },
    dayColumnStyle: {
      type: Object,
      default: () => ({}),
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

.day-capacity-footer {
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

.day-capacity-text {
  font-size: 9px;
  font-weight: 500;
  color: #9ca3af;
  user-select: none;
}

.day-capacity-footer.capacity-full {
  background: rgba(239, 68, 68, 0.1);
  border-top-color: rgba(239, 68, 68, 0.15);

  .day-capacity-text {
    color: #dc2626;
    font-weight: 600;
  }
}

.day-capacity-footer.capacity-high {
  background: rgba(245, 158, 11, 0.08);
  border-top-color: rgba(245, 158, 11, 0.12);

  .day-capacity-text {
    color: #ea580c;
    font-weight: 600;
  }
}

.day-capacity-footer.capacity-medium {
  background: rgba(234, 179, 8, 0.06);
  border-top-color: rgba(234, 179, 8, 0.1);

  .day-capacity-text {
    color: #ca8a04;
    font-weight: 600;
  }
}
</style>
