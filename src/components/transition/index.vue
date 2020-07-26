<template>
  <transition
    :name="name"
    @before-enter="$_onPopupTransitionStart"
    @before-leave="$_onPopupTransitionStart"
    @after-enter="$_onPopupTransitionEnd"
    @after-leave="$_onPopupTransitionEnd"
  >
    <slot></slot>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'v-transition',

  // functional: true,

  props: {
    name: {
      type: String,
      default: 'v-fade',
      required: true
    },
    transitionStart: {
      type: Function,
      default: () => {}
    },
    transitionEnd: {
      type: Function,
      default: () => {}
    },
  },

  methods: {
    $_onPopupTransitionStart() {
      this.transitionStart()
    },
    $_onPopupTransitionEnd() {
      this.transitionEnd()
    }
  }
})
</script>
