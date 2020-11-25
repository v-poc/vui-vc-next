<template>
  <div :class="wrapperCls">
    <div
      :class="iconCls"
      @click="onChange"
    >
      <div class="v-agree-icon-container">
        <v-icon
          name="checked"
          :size="size"
        ></v-icon>
        <v-icon
          name="check"
          :size="size"
        ></v-icon>
      </div>
    </div>
    <div class="v-agree-content">
      <slot></slot>
    </div>    
  </div>
</template>

<script>
import { computed } from 'vue'
import VIcon from '../icon/index.vue'

export default {
  name: 'v-agree',

  components: {
    VIcon
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 'md'
    }
  },

  setup(props, { emit }) {
    const wrapperCls = computed(() => {
      return [
        'v-agree',
        {
          disabled: props.disabled
        }
      ]
    })

    const iconCls = computed(() => {
      return [
        'v-agree-icon',
        {
          checked: props.value
        }
      ]
    })

    const onChange = (e) => {
      if (props.disabled) {
        return
      }
      emit('update:value', !props.value)
      emit('change', e)
    }

    return {
      wrapperCls,
      iconCls,
      onChange
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-agree {
  display: flex;
  align-items: center;

  &.disabled {
    opacity: $agree-disabled-opacity;
  }
}

.v-agree-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  flex-shrink: 0;
  position: relative;
  margin-right: $h-gap-sm;
  color: $agree-fill;
  width: 0.5rem;
  height: 0.5rem;

  .v-agree-icon-container {
    position: relative;

    .v-icon {
      display: flex;
      width: auto;
      height: auto;
      line-height: 1;
      will-change: auto;

      &.v-icon-checked {
        position: absolute;
        top: 0;
        left: 0;
        transform: scale(0.6);
        color: transparent;
        transition: all .3s $ease-in-out-quint;
      }

      &.v-icon-check {
        color: $agree-fill;
      }
    }
  }

  &.checked .v-agree-icon-container {
    .v-icon-checked {
      transform: scale(1);
      color: $agree-fill;
    }

    .v-icon-check {
      opacity: 0.8;
    }
  }
}

.v-agree-content {
  flex: 1 1 0%;
  font-size: 0.24rem;
  // line-height: 1.5;
}
</style>
