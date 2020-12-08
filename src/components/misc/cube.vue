<template>
  <div class="cube-wrapper">
    <div class="cube">
      <ul>
        <li class="front">{{ front }}</li>
        <li class="back">{{ back }}</li>
        <li class="top">{{ top }}</li>
        <li class="bottom">{{ bottom }}</li>
        <li class="left">{{ left }}</li>
        <li class="right">{{ right }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'v-cube',

  props: {
    scale: {
      type: Number,
      default: 1
    },
    front: {
      type: String,
      default: '1'
    },
    back: {
      type: String,
      default: '2'
    },
    top: {
      type: String,
      default: '3'
    },
    bottom: {
      type: String,
      default: '4'
    },
    left: {
      type: String,
      default: '5'
    },
    right: {
      type: String,
      default: '6'
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
    perspective: 1000px;
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
