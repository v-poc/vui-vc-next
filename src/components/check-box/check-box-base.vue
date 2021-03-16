<template>
  <div :class="cls">
    <slot></slot>
    <v-tag
      v-if="state.isChecked"
      size="tiny"
      shape="quarter"
      type="fill"
    >
      <v-icon name="right"></v-icon>
    </v-tag>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import VTag from '../tag/index.vue'
import VIcon from '../icon/index.vue'


export default {
  name: 'v-check-box-base',

  components: {
    VTag,
    VIcon
  },  

  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const state = reactive({
      isChecked: props.isChecked
    })

    const cls = computed(() => {
      return [
        'v-check-box-base',
        {
          'is-disabled': props.disabled,
          'is-checked': state.isChecked
        }
      ]
    })

    return {
      state,
      cls
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui-variables.scss';

.v-check-box-base {
  position: relative;
  display: inline-block;
  text-align: center;
  color: $checkbox-color;
  font-size: $checkbox-font-size;
  padding: $v-gap-sm $h-gap-md;
  border: 1px solid $checkbox-border-color;
  border-radius: $checkbox-border-radius;
  box-sizing: border-box;
  overflow: hidden;

  &.is-checked {
    color: $checkbox-active-color;
    border-color: $checkbox-active-border-color;

    &.is-disabled {
      color: $checkbox-active-color;
      border-color: $checkbox-active-border-color;
      opacity: 0.6;
    }
  }

  &.is-disabled {
    color: $checkbox-disabled-color;
    border-color: $checkbox-disabled-color;
  }

  .v-tag {
    position: absolute;
    top: 0;
    right: 0;

    .quarter-bg {
      background-color: $checkbox-active-color;
    }
  }
}
</style>
