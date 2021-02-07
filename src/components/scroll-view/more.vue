<template>
  <div class="v-scroll-view-more">
    {{ isFinished ? finishedText : loadingText }}
  </div>
</template>

<script>
export default {
  name: 'v-scroll-view-more',

  props: {
    loadingText: {
      type: String,
      default: 'Loading more...'
    },
    finishedText: {
      type: String,
      default: 'Already loaded.'
    },
    isFinished: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui-variables.scss';

.v-scroll-view-more {
  padding: $v-gap-lg 0;
  font-size: $font-minor-large;
  text-align: center;
  color: $color-text-caption;
}
</style>
