<template>
  <div class="cube-wrapper">
    <div class="cube">
      <ul>
        <li class="front">
          <slot name="front">{{ front }}</slot>
        </li>
        <li class="back">
          <slot name="back">{{ back }}</slot>
        </li>
        <li class="top">
          <slot name="top">{{ top }}</slot>
        </li>
        <li class="bottom">
          <slot name="bottom">{{ bottom }}</slot>
        </li>
        <li class="left">
          <slot name="left">{{ left }}</slot>
        </li>
        <li class="right">
          <slot name="right">{{ right }}</slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'v-cube-anim',

  props: {
    scale: {
      type: Number,
      default: 1
    },
    front: {
      type: String,
      default: 'Front'
    },
    back: {
      type: String,
      default: 'Back'
    },
    top: {
      type: String,
      default: 'Top'
    },
    bottom: {
      type: String,
      default: 'Bottom'
    },
    left: {
      type: String,
      default: 'Left'
    },
    right: {
      type: String,
      default: 'Right'
    }
  }
})
</script>

<style lang="scss">
$width: 150px;
$height: $width;
$length: $width;

.cube-wrapper {
  display: flex;
  justify-content: center;
  padding: 60px 0;

  .cube {
    transform: scale(v-bind(scale));
    width: $width;
    height: $height;
    // perspective: 1000px;
    perspective: 1000;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    ul {
      position: relative;
      width: 100%;
      height: 100%;
      transform: rotateX(-15deg) rotateY(15deg);
      transform-style: preserve-3d;
      animation: rotate 5s infinite linear;
    }
    li {
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      width: $width;
      height: $height;
      opacity: 0.8;
      font-size: 50px;
      color: #fff;
      &.front {
        background-color: #f66;
        transform: translateZ($length / 2);
      }
      &.back {
        background-color: #66f;
        transform: rotateY(180deg) translateZ($length / 2);
      }
      &.top {
        background-color: #f90;
        transform: rotateX(90deg) translateZ($height / 2);
      }
      &.bottom {
        background-color: #09f;
        transform: rotateX(-90deg) translateZ($height / 2);
      }
      &.left {
        background-color: #9c3;
        transform: rotateY(-90deg) translateZ($width / 2);
      }
      &.right {
        background-color: #3c9;
        transform: rotateY(90deg) translateZ($width / 2);
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotateY(0) rotateX(0);
  }
  to {
    transform: rotateY(-1turn) rotateX(-1turn);
  }
}
</style>
