<template>
  <transition
    :name="name"
    @before-enter="onPopupTransitionStart"
    @before-leave="onPopupTransitionStart"
    @after-enter="onPopupTransitionEnd"
    @after-leave="onPopupTransitionEnd"
  >
    <slot></slot>
  </transition>
</template>

<script>

export default {
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
    }
  },

  setup(props) {
    const onPopupTransitionStart = () => {
      props.transitionStart()
    }

    const onPopupTransitionEnd = () => {
      props.transitionEnd()
    }

    return {
      onPopupTransitionStart,
      onPopupTransitionEnd
    }
  }
}
</script>
