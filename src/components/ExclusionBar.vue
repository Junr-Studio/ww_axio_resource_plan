<template>
  <div class="exclusion-bar" :style="exclusionStyle">
    <div class="exclusion-pattern"></div>
    <div class="exclusion-label" v-if="showLabel">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExclusionBar',
  props: {
    exclusion: {
      type: Object,
      required: true,
    },
    exclusionStyle: {
      type: Object,
      required: true,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    label() {
      // Extract label from original exclusion data if available
      return this.exclusion?.originalExclusion?.label
        || this.exclusion?.originalExclusion?.reason
        || 'Unavailable';
    },
  },
};
</script>

<style lang="scss" scoped>
.exclusion-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(107, 114, 128, 0.15),
    rgba(107, 114, 128, 0.15) 10px,
    rgba(107, 114, 128, 0.25) 10px,
    rgba(107, 114, 128, 0.25) 20px
  );
  border-left: 2px solid rgba(107, 114, 128, 0.5);
  border-right: 2px solid rgba(107, 114, 128, 0.5);
  pointer-events: none;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.exclusion-pattern {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.4);
  mix-blend-mode: overlay;
  pointer-events: none;
}

.exclusion-label {
  position: relative;
  font-size: 10px;
  font-weight: 600;
  color: rgba(55, 65, 81, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 8px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  z-index: 1;
}
</style>
