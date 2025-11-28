<template>
  <div class="timeline-header">
    <!-- Resource column header spanning both rows -->
    <div class="resource-column-header" :style="resourceColumnStyle">
      <!-- Empty header space -->
    </div>

    <!-- Right side with week numbers and days -->
    <div class="header-right">
      <!-- Week numbers row -->
      <div ref="headerScrollRef" class="weeks-container">
        <div class="weeks-content">
          <div
            v-for="(week, index) in weeks"
            :key="`week-${week.year}-${week.weekNumber}`"
            class="week-header"
            :style="getWeekStyle(week)"
          >
            <span class="week-label">{{ t.week }}{{ week.weekNumber }}</span>
          </div>
        </div>
      </div>

      <!-- Days row -->
      <div ref="daysScrollRef" class="days-container">
        <div class="days-content" :style="daysContainerStyle">
          <div
            v-for="day in days"
            :key="day.dayKey"
            class="day-column-header"
            :style="dayColumnStyle"
          >
            <div class="month-label">{{ getMonthLabel(day) }}</div>
            <div class="day-label">{{ day.dayOfWeek }}</div>
            <div class="day-number">{{ day.dayNumber }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import { useLocale } from '../composables/useLocale';

// Get locale for internationalization
const { dateFnsLocale, t } = useLocale();

const props = defineProps({
  days: {
    type: Array,
    required: true,
  },
  weeks: {
    type: Array,
    required: true,
  },
  resourceColumnStyle: {
    type: Object,
    default: () => ({}),
  },
  dayColumnStyle: {
    type: Object,
    default: () => ({}),
  },
  daysContainerStyle: {
    type: Object,
    default: () => ({}),
  },
});

const headerScrollRef = ref(null); // weeks container
const daysScrollRef = ref(null); // days container

/**
 * Calculate the width style for each week header based on day count
 */
const getWeekStyle = (week) => {
  const dayWidth = parseInt(props.dayColumnStyle.width) || 40;
  const weekWidth = week.dayCount * dayWidth;

  return {
    width: `${weekWidth}px`,
    minWidth: `${weekWidth}px`,
    flexBasis: `${weekWidth}px`,
  };
};

/**
 * Get month label for each day
 */
const getMonthLabel = (day) => {
  if (!day?.date) return '';
  return format(day.date, 'MMM', { locale: dateFnsLocale.value });
};

// Explicitly expose refs to parent component
defineExpose({
  headerScrollRef,  // weeks container
  daysScrollRef,    // days container
});
</script>

<style lang="scss" scoped>
.timeline-header {
  display: flex;
  background: var(--header-bg-color);
  border-bottom: 2px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
}

.resource-column-header {
  display: flex;
  align-items: center;
  padding: 16px;
  font-weight: 600;
  font-size: 14px;
  border-right: 2px solid var(--border-color);
  position: sticky;
  left: 0;
  background: var(--header-bg-color);
  z-index: 11;

  /* Create a solid barrier on the right to cover scrolling content */
  &::after {
    content: '';
    position: absolute;
    right: -1px;
    top: 0;
    bottom: 0;
    width: 5px;
    background: inherit;
    pointer-events: none;
    z-index: 1;
  }
}

.header-right {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

/* Week numbers row */
.weeks-container {
  overflow-x: auto;
  flex: 1;
  min-width: 0;
  border-bottom: 1px solid var(--border-color);

  /* Hide scrollbar but allow scrolling */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Prevent user scrolling, only programmatic */
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}

.weeks-content {
  display: flex;
  height: 100%;
}

.week-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 4px;
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;
  background: var(--header-bg-color);
  font-weight: 600;
  font-size: 11px;
  color: #374151;

  .week-label {
    white-space: nowrap;
  }
}

/* Days row */
.days-container {
  overflow-x: auto;
  flex: 1;
  min-width: 0;

  /* Hide scrollbar but allow scrolling */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Prevent user scrolling, only programmatic */
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}

.days-content {
  display: flex;
  height: 100%;
}

.day-column-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 4px;
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;
  gap: 2px;

  .month-label {
    font-weight: 700;
    font-size: 8px;
    color: #3b82f6;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .day-label {
    font-weight: 600;
    font-size: 10px;
    color: #6b7280;
  }

  .day-number {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
