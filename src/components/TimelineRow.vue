<template>
  <div class="timeline-row" :style="rowStyle">
    <!-- Row Info Column (sticky) -->
    <div class="row-info" :style="rowColumnStyle" @click="$emit('row-click', row)">
      <img v-if="row.avatar" :src="row.avatar" class="row-avatar" alt="avatar" />
      <div class="row-avatar-placeholder" v-else>
        {{ getInitials(row.name) }}
      </div>
      <div class="row-details">
        <div class="row-name">{{ row.name }}</div>
        <div v-if="row.position" class="row-position">{{ row.position }}</div>
      </div>
    </div>

    <!-- Timeline Grid -->
    <div class="timeline-grid">
      <div class="timeline-grid-content" :style="daysContainerStyle">
        <!-- Day Cells (background) -->
        <DayCell
          v-for="day in days"
          :key="`${row.id}-day-${day.dayKey}`"
          :day="day"
          :load-info="getDayLoadInfo(row.id, day.date)"
          :day-column-style="dayColumnStyle"
          :show-load-percentage="showLoadPercentage"
        />

        <!-- Item Bars -->
        <ItemBar
          v-for="item in items"
          :key="item.id"
          :item="item"
          :bar-style="getItemBarStyle(item, row.id)"
          :show-load-percentage="showLoadPercentage"
          @click="$emit('item-click', item)"
          @show-tooltip="(item, event) => $emit('show-tooltip', item, event)"
          @hide-tooltip="$emit('hide-tooltip')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getInitials } from '../utils/dateHelpers';
import DayCell from './DayCell.vue';
import ItemBar from './ItemBar.vue';

export default {
  name: 'TimelineRow',
  components: {
    DayCell,
    ItemBar,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    rowStyle: {
      type: Object,
      default: () => ({}),
    },
    rowColumnStyle: {
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
    getDayLoadInfo: {
      type: Function,
      required: true,
    },
    getItemBarStyle: {
      type: Function,
      required: true,
    },
    showLoadPercentage: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['row-click', 'item-click', 'show-tooltip', 'hide-tooltip'],
  setup() {
    return {
      getInitials,
    };
  },
};
</script>

<style lang="scss" scoped>
.timeline-row {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  min-width: fit-content;

  &:nth-child(even) {
    background: rgba(0, 0, 0, 0.015);

    .row-info {
      background: linear-gradient(rgba(0, 0, 0, 0.015), rgba(0, 0, 0, 0.015)), var(--bg-color);
    }

    .timeline-grid {
      background: rgba(0, 0, 0, 0.015);
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);

    .row-info {
      background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), var(--bg-color);
    }

    .timeline-grid {
      background: rgba(0, 0, 0, 0.04);
    }
  }
}

.row-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-right: 2px solid var(--border-color);
  position: sticky;
  left: 0;
  background: var(--bg-color);
  z-index: 100;
  cursor: pointer;
  transition: background 0.2s;

  /* Create a solid barrier on the right to cover scrolling content */
  &::after {
    content: '';
    position: absolute;
    right: -1px; /* Position 1px outside the border */
    top: 0;
    bottom: 0;
    width: 5px; /* Wider barrier */
    background: inherit; /* Use the same background as parent */
    pointer-events: none;
    z-index: 1;
  }
}

.row-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.row-avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.row-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.row-name {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-position {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timeline-grid {
  position: relative;
  display: flex;
  flex: 1;
}

.timeline-grid-content {
  display: flex;
  height: 100%;
  position: relative;
}
</style>
