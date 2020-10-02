<template>
  <div
    :class="cls"
    @click="onChange"
  ></div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'v-switch',

  props: {
    value: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const cls = computed(() => {
      return [
        'v-switch',
        {
          'active': props.value,
          'disabled': props.disabled
        }
      ]
    })

    const onChange = (evt) => {
      if (props.disabled) {
        return
      }
      // emit('input', !props.value)
      emit('update:value', !props.value)
      emit('change', evt)
    }

    return {
      cls,
      onChange
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-switch {
  box-sizing: border-box;
  position: relative;
  width: 0.8rem;
  height: 0.48rem;
  border-radius: 0.48rem;
  background-color: $switch-fill-inverse;

  &.disabled {
    opacity: $switch-item-color-disabled;
  }

  &::before, &::after {
    content: "";
    position: absolute;
    transition: transform .3s;
  }

  &::before {
    top: 0;
    left: 0;
    width: 0.8rem;
    height: 0.48rem;
    border-radius: 0.24rem;
    background-color: $switch-fill-inverse;
  }

  &::after {
    top: 4px;
    left: 4px;
    width: 0.4rem;
    height: 0.4rem;
    background-color: $switch-handle-color;
    border-radius: 50%;
  }

  &.active {
    background-color: $switch-fill;
  }

  &.active::before {
    transform: scale(0);
  }

  &.active::after {
    transform: translateX(0.32rem);
  }
}
</style>
