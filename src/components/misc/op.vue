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
    width: 100px;
    height: 100px;
    border: 3px solid #010101;
    background: #20526F;
    border-radius: 50%;
    clip-path: inset(0 0 50% 0);
    position: absolute;
    overflow: hidden;
    top: -3px;

    &::after {
      content: '';
      height: 12px;
      width: 110%;
      border: 3px solid #010101;
      background: #00CF74;
      position: absolute;
      top: 36%;
      transform: translatey(-50%);
      left: -10px;
    }

    .line-lt {
      position: absolute;
      border-left: 3px solid #010101;
      height: 13px;
      left: 28px;
      top: 13px;
      border-radius: 50%;
      width: 5px;
      transform: rotate(34deg);

      &::before {
        content: '';
        position: absolute;
        border-left: 3px solid #010101;
        height: 17px;
        left: -10px;
        top: 1px;
        border-radius: 50%;
        width: 5px;
        transform: rotate(0deg);
      }

      &::after {
        content: '';
        position: absolute;
        border-left: 3px solid #010101;
        height: 9px;
        left: 5px;
        top: -3px;
        border-radius: 50%;
        width: 3px;
        transform: rotate(-9deg);
      }
    }

    .line-rt {
      position: absolute;
      border-right: 3px solid #010101;
      height: 15px;
      right: 22px;
      top: 11px;
      border-radius: 50%;
      width: 5px;
      transform: rotate(-30deg);

      &::before {
        content: '';
        position: absolute;
        border-right: 3px solid #010101;
        height: 9px;
        right: 7px;
        top: 0px;
        border-radius: 50%;
        width: 4px;
        transform: rotate(11deg);
      }
    }
  }

  .head {
    width: 100px;
    height: calc(100px - 0.9rem);
    border: 3px solid #010101;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 0.9rem;
    position: relative;
    background: #FFF;
    z-index: 3;

    &::before {
      content: '';
      height: 5px;
      width: 150px;
      border: 3px solid #010101;
      background: #20526F;
      position: absolute;
      top: 50%;
      transform: translatey(-8px);
      border-radius: 5px;
      z-index: 1;
    }

    &::after {
      content: '';
      width: 11px;
      height: 8px;
      border-radius: 50%;
      background: #010101;
      position: absolute;
      bottom: 8px;
    }
  }

  .eye {
    width: 28px;
    height: 28px;
    background: #010101;
    border-radius: 50%;
    position: absolute;
    bottom: 15px;
  }

  .eye-lt {
    left: 15px;
  }

  .eye-rt {
    right: 15px;
  }

  .bone {
    height: 13px;
    width: 50px;
    border: 3px solid #010101;
    border-left: none;
    z-index: 1;
    position: absolute;
    background: #FFF;

    &::after {
      content: '';
      height: 15px;
      width: 15px;
      border: 3px solid #010101;
      border-radius: 50%;
      left: 11px;
      top: 0;
      position: absolute;
      background: #FFF;
      transform: translatex(-18px) translatey(2px) rotate(-90deg);
      clip-path: polygon(48% 100%, 0 100%, 0 0, 100% 0, 100% 10%, 50% 50%);
    }

    &::before {
      content: '';
      height: 15px;
      width: 15px;
      border: 3px solid #010101;
      border-radius: 50%;
      left: 12px;
      top: 3px;
      position: absolute;
      background: #FFF;
      transform: translatex(-19px) translatey(-13px);
      clip-path: polygon(25% 100%, 0 100%, 0 0, 100% 0, 100% 48%, 50% 50%);
    }

    &:nth-child(1) {
      transform: rotate(42deg);
      top: 13px;
      left: -36px;
    }

    &:nth-child(2) {
      transform: rotate(137deg);
      top: 13px;
      right: -36px;
    }

    &:nth-child(3) {
      transform: rotate(313deg);
      bottom: -23px;
      left: -10px;
    }

    &:nth-child(4) {
      transform: rotate(227deg);
      bottom: -23px;
      right: -10px;
    }
  }

  .mouth {
    position: absolute;
    height: 120px;
    width: 55px;
    border: 3px solid #010101;
    margin: 0 auto;
    border-radius: 50%;
    transform: rotatex(60deg) translatex(-50%);
    left: 50%;
    top: 55px;
    z-index: 2;
    border-width: 4px;
    overflow: hidden;
    background: #FFF;

    &::before,
    &::after {
      content: '';
      width: 70px;
      height: 100px;
      border: 3px solid #010101;
      position: absolute;
      border-radius: 50%;
      transform: rotatex(0deg) translatex(-50%);
      left: 50%;
      border-width: 5px;
    }

    &::before {
      top: -52px;
    }

    &::after {
      top: -30px;
    }

    .teeth {
      position: absolute;
      left: 50%;
      width: 3px;
      height: 46px;
      background: #010101;
      top: 30px;
      transform: translatex(-50%);

      &::after,
      &::before {
        background: #010101;
        position: absolute;
        height: 45px;
        width: 3px;
        content: '';
      }

      &::after {
        transform: translatex(-14px) rotate(3deg);
      }

      &::before {
        transform: translatex(14px) rotate(-3deg);
      }
    }
  }
}
</style>
