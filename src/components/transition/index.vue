<template>
  <transition :name="name">
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
      default: 'm-fade',
      required: true
    }
  }
})
</script>
