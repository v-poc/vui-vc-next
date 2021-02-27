<template>
  <div class="v-op-wrapper">
    <div class="v-op" :style="opStyle">
      <div class="bone"></div>
      <div class="bone"></div>
      <div class="bone"></div>
      <div class="bone"></div>
      <div class="head">
        <div class="hat">
          <div class="line-lt"></div>
          <div class="line-rt"></div>
        </div>
        <div class="eye eye-lt"></div>
        <div class="eye eye-rt"></div>
      </div>
      <div class="mouth">
        <div class="teeth"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'v-one-piece',

  props: {
    scale: {
      type: Number,
      default: 1
    }
  },

  setup(props) {
    const opStyle = computed(() => {
      const res = {}
      if (props.scale !== 1) {
        res['transform'] = `scale(${props.scale})`
      }
      return res
    })

    return {
      opStyle
    }
  }
}
</script>

<style lang="scss">
.v-op-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.v-op {
  position: relative;
  transition: 0.2s;

  &:hover {
    transform: scale(1.25);
  }

  .hat {
    width: 100Px;
    height: 100Px;
    border: 3Px solid #010101;
    background: #20526F;
    border-radius: 50%;
    clip-path: inset(0 0 50% 0);
    position: absolute;
    overflow: hidden;
    top: -3Px;

    &::after {
      content: '';
      height: 12Px;
      width: 110%;
      border: 3Px solid #010101;
      background: #00CF74;
      position: absolute;
      top: 36%;
      transform: translatey(-50%);
      left: -10Px;
    }

    .line-lt {
      position: absolute;
      border-left: 3Px solid #010101;
      height: 13Px;
      left: 28Px;
      top: 13Px;
      border-radius: 50%;
      width: 5Px;
      transform: rotate(34deg);

      &::before {
        content: '';
        position: absolute;
        border-left: 3Px solid #010101;
        height: 17Px;
        left: -10Px;
        top: 1Px;
        border-radius: 50%;
        width: 5Px;
        transform: rotate(0deg);
      }

      &::after {
        content: '';
        position: absolute;
        border-left: 3Px solid #010101;
        height: 9Px;
        left: 5Px;
        top: -3Px;
        border-radius: 50%;
        width: 3Px;
        transform: rotate(-9deg);
      }
    }

    .line-rt {
      position: absolute;
      border-right: 3Px solid #010101;
      height: 15Px;
      right: 22Px;
      top: 11Px;
      border-radius: 50%;
      width: 5Px;
      transform: rotate(-30deg);

      &::before {
        content: '';
        position: absolute;
        border-right: 3Px solid #010101;
        height: 9Px;
        right: 7Px;
        top: 0Px;
        border-radius: 50%;
        width: 4Px;
        transform: rotate(11deg);
      }
    }
  }

  .head {
    width: 100Px;
    height: calc(100Px - 90Px);
    border: 3Px solid #010101;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 90Px;
    position: relative;
    background: #FFF;
    z-index: 3;

    &::before {
      content: '';
      height: 5Px;
      width: 150Px;
      border: 3Px solid #010101;
      background: #20526F;
      position: absolute;
      top: 50%;
      transform: translatey(-8Px);
      border-radius: 5Px;
      z-index: 1;
    }

    &::after {
      content: '';
      width: 11Px;
      height: 8Px;
      border-radius: 50%;
      background: #010101;
      position: absolute;
      bottom: 8Px;
    }
  }

  .eye {
    width: 28Px;
    height: 28Px;
    background: #010101;
    border-radius: 50%;
    position: absolute;
    bottom: 15Px;
  }

  .eye-lt {
    left: 15Px;
  }

  .eye-rt {
    right: 15Px;
  }

  .bone {
    height: 13Px;
    width: 50Px;
    border: 3Px solid #010101;
    border-left: none;
    z-index: 1;
    position: absolute;
    background: #FFF;

    &::after {
      content: '';
      height: 15Px;
      width: 15Px;
      border: 3Px solid #010101;
      border-radius: 50%;
      left: 11Px;
      top: 0;
      position: absolute;
      background: #FFF;
      transform: translatex(-18Px) translatey(2Px) rotate(-90deg);
      clip-path: polygon(48% 100%, 0 100%, 0 0, 100% 0, 100% 10%, 50% 50%);
    }

    &::before {
      content: '';
      height: 15Px;
      width: 15Px;
      border: 3Px solid #010101;
      border-radius: 50%;
      left: 12Px;
      top: 3Px;
      position: absolute;
      background: #FFF;
      transform: translatex(-19Px) translatey(-13Px);
      clip-path: polygon(25% 100%, 0 100%, 0 0, 100% 0, 100% 48%, 50% 50%);
    }

    &:nth-child(1) {
      transform: rotate(42deg);
      top: 13Px;
      left: -36Px;
    }

    &:nth-child(2) {
      transform: rotate(137deg);
      top: 13Px;
      right: -36Px;
    }

    &:nth-child(3) {
      transform: rotate(313deg);
      bottom: -23Px;
      left: -10Px;
    }

    &:nth-child(4) {
      transform: rotate(227deg);
      bottom: -23Px;
      right: -10Px;
    }
  }

  .mouth {
    position: absolute;
    height: 120Px;
    width: 55Px;
    border: 3Px solid #010101;
    margin: 0 auto;
    border-radius: 50%;
    transform: rotatex(60deg) translatex(-50%);
    left: 50%;
    top: 55Px;
    z-index: 2;
    border-width: 4Px;
    overflow: hidden;
    background: #FFF;

    &::before,
    &::after {
      content: '';
      width: 70Px;
      height: 100Px;
      border: 3Px solid #010101;
      position: absolute;
      border-radius: 50%;
      transform: rotatex(0deg) translatex(-50%);
      left: 50%;
      border-width: 5Px;
    }

    &::before {
      top: -52Px;
    }

    &::after {
      top: -30Px;
    }

    .teeth {
      position: absolute;
      left: 50%;
      width: 3Px;
      height: 46Px;
      background: #010101;
      top: 30Px;
      transform: translatex(-50%);

      &::after,
      &::before {
        background: #010101;
        position: absolute;
        height: 45Px;
        width: 3Px;
        content: '';
      }

      &::after {
        transform: translatex(-14Px) rotate(3deg);
      }

      &::before {
        transform: translatex(14Px) rotate(-3deg);
      }
    }
  }
}
</style>
