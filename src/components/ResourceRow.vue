<template>
  <div class="resource-row" :style="rowStyle">
    <!-- Resource Info Column (sticky) -->
    <div class="resource-info" :style="resourceColumnStyle" @click="$emit('resource-click', resource)">
      <img v-if="resource.avatar" :src="resource.avatar" class="resource-avatar" alt="avatar" />
      <div class="resource-avatar-placeholder" v-else>
        {{ getInitials(resource.name) }}
      </div>
      <div class="resource-details">
        <div class="resource-name">{{ resource.name }}</div>
        <div v-if="resource.role" class="resource-role">{{ resource.role }}</div>
      </div>
    </div>

    <!-- Timeline Grid -->
    <div class="timeline-grid">
      <div class="timeline-grid-content" :style="daysContainerStyle">
        <!-- Day Cells (background) -->
        <DayCell
          v-for="day in days"
          :key="`${resource.id}-day-${day.dayKey}`"
          :day="day"
          :capacity-info="getDayCapacityInfo(resource.id, day.date)"
          :day-column-style="dayColumnStyle"
        />

        <!-- Assignment Bars -->
        <AssignmentBar
          v-for="assignment in assignments"
          :key="assignment.id"
          :assignment="assignment"
          :bar-style="getAssignmentBarStyle(assignment, resource.id)"
          @click="$emit('assignment-click', assignment)"
          @show-tooltip="(assignment, event) => $emit('show-tooltip', assignment, event)"
          @hide-tooltip="$emit('hide-tooltip')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getInitials } from '../utils/dateHelpers';
import DayCell from './DayCell.vue';
import AssignmentBar from './AssignmentBar.vue';

export default {
  name: 'ResourceRow',
  components: {
    DayCell,
    AssignmentBar,
  },
  props: {
    resource: {
      type: Object,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
    assignments: {
      type: Array,
      required: true,
    },
    rowStyle: {
      type: Object,
      default: () => ({}),
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
    getDayCapacityInfo: {
      type: Function,
      required: true,
    },
    getAssignmentBarStyle: {
      type: Function,
      required: true,
    },
  },
  emits: ['resource-click', 'assignment-click', 'show-tooltip', 'hide-tooltip'],
  setup() {
    return {
      getInitials,
    };
  },
};
</script>

<style lang="scss" scoped>
.resource-row {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  min-width: fit-content;

  &:nth-child(even) {
    background: rgba(0, 0, 0, 0.015);

    .resource-info {
      background: linear-gradient(rgba(0, 0, 0, 0.015), rgba(0, 0, 0, 0.015)), var(--bg-color);
    }

    .timeline-grid {
      background: rgba(0, 0, 0, 0.015);
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);

    .resource-info {
      background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), var(--bg-color);
    }

    .timeline-grid {
      background: rgba(0, 0, 0, 0.04);
    }
  }
}

.resource-info {
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

.resource-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.resource-avatar-placeholder {
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

.resource-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.resource-name {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-role {
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
