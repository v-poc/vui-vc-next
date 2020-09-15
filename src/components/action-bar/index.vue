<template>
  <div class="v-action-bar">
    <div class="v-action-bar-container">
      <div class="v-action-bar-text" v-if="defaultSlot">
        <slot></slot>
      </div>
      <div class="v-action-bar-group">
        <template
          v-for="(item, index) in sliceActions"
          :key="`button${index}`"
        >
          <v-button
            class="v-action-bar-button"
            :type="item.type || (item.disabled ? 'disabled' : 'primary')"
            :plain="item.plain || (index !== sliceActions.length - 1)"
            :round="item.round"
            :inactive="item.inactive"
            :loading="item.loading"
            :icon="item.icon"
            :icon-svg="item.iconSvg"
            @click="onClick(item)"
          >
            {{ item.text }}
          </v-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import VButton from '../button/index.vue'

export default {
  name: 'v-action-bar',

  components: {
    VButton 
  },

  props: {
    actions: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { emit, slots }) {
    const sliceActions = computed(() => props.actions.slice(0, 2))

    const defaultSlot = computed(() => (slots && Object.keys(slots).length > 0))

    const onClick = (item) => {
      item && item.onClick && item.onClick(item)
      emit('click', item)
    }

    return {
      sliceActions,
      defaultSlot,
      onClick
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-action-bar {
  position: fixed;
  z-index: $action-bar-zindex;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  padding: $action-bar-padding-v $action-bar-padding-h;
  background: $color-bg-inverse;
  @include clearfix();
}

.v-action-bar-container {
  display: flex;
  flex: 1;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.v-action-bar-text {
  display: flex;
  flex: 1;
  height: $action-bar-slot-height;
  margin-right: $action-bar-button-gap;
  align-items: center;
  overflow: hidden;
}

.v-action-bar-group {
  display: flex;
  flex: 1;
  height: 100%;
}

.v-action-bar-button {
  display: flex;
  float: right;
  align-items: center;
  justify-content: center;
  flex: 1;

  &:nth-of-type(2) {
    margin-left: $action-bar-button-gap;
  }
}
</style>
