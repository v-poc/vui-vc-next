<template>
  <div
    ref="btnRef"
    class="v-btn-op"
    :style="btnStyle"
  >
    <div
      class="v-btn-chi"
      @click="onClickButton"
    >
      <div class="v-btn-star">★</div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'v-cool-button',

  props: {
    scale: {
      type: Number,
      default: 1
    }
  },  

  setup(props, { emit }) {
    const btnRef = ref('btnRef')

    const btnStyle = computed(() => {
      const res = {}
      if (props.scale !== 1) {
        res['transform'] = `scale(${props.scale})`
      }
      return res
    })

    const onClickButton = () => {
      const p = btnRef.value
      if (p) {
        p.className = 'v-btn-op pururun'
        setTimeout(() => {
          p.className = 'v-btn-op'
          emit('on-click')
        }, 2000)
      }
    }

    return {
      btnRef,
      btnStyle,
      onClickButton
    }
  }  
}
</script>

<style lang="scss">
.v-btn-star {
  display: block;
  position: absolute;
  top: 3px;
  left: 11px;
  z-index: 18;
  color: #c45c3c;
  transform: scale(0.35);
  opacity: 0.5;
}

.v-btn-chi {
  cursor: -webkit-grabbing;
  position: absolute;
  top: 50px;
  left: 55px;
  width: 40px;
  height: 40px;
  z-index: 3;
  background: #fac3b4;
  border-radius: 20px;
  box-shadow: 0 3px 20px #ed9c86;
  -webkit-transform-origin: center center;
  transform: scaleY(0.92) scaleX(0.91);

  &:before {
    position: absolute;
    top: 11px;
    left: 13px;
    content: '';
    width: 16px;
    height: 16px;
    background: #ffb7a4;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    -webkit-box-shadow: 0 2px 5px #ec8d73;
    -moz-box-shadow: 0 2px 5px #ec8d73;
    box-shadow: 0 2px 5px #ec8d73;
  }

  &:after {
    position: absolute;
    top: 13px;
    left: 15px;
    content: '';
    width: 10px;
    height: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 5px #fff;
    -moz-box-shadow: 0 0 5px #fff;
    box-shadow: 0 0 5px #fff;
  }
}

.v-btn-op {
  cursor: -webkit-grab;
  position: relative;
  margin: 0 auto;
  width: 150px;
  height: 150px;
  background: #ffe0a9;
  border-radius: 75px;
  -webkit-transform-origin: center center;
  -webkit-transform: scaleY(0.95);
  background-image: -webkit-gradient(
      radial,
      50 50,
      0,
      50 30,
      150,
      from(rgba(255, 255, 255, 0.5)),
      color-stop(70%, rgba(253, 212, 142, 1)),
      color-stop(95%, rgba(240, 188, 120, 1)),
      to(rgba(255, 255, 255, 0))
    ),
    -webkit-gradient(radial, 20 20, 0, 80 80, 90, from(rgba(255, 255, 255, 0.5)), color-stop(50%, rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);

  &.pururun {
    -webkit-animation-name: pururun;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: 2;
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
    -webkit-animation-delay: 0.08s;

    .v-btn-chi {
      -webkit-animation-name: pururin;
      -webkit-animation-duration: 1s;
      -webkit-animation-iteration-count: 2;
      -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
    }
  }
}

@-webkit-keyframes pururun {
  0% {
    -webkit-transform: scale(0.95);
  }
  10% {
    -webkit-transform: scale(1.1);
  }
  20% {
    -webkit-transform: scale(0.927);
  }
  30% {
    -webkit-transform: scale(1.051);
  }
  40% {
    -webkit-transform: scale(0.965);
  }
  50% {
    -webkit-transform: scale(1.021);
  }
  60% {
    -webkit-transform: scale(0.987);
  }
  70% {
    -webkit-transform: scale(1.0027);
  }
  80% {
    -webkit-transform: scale(0.9992);
  }
  90% {
    -webkit-transform: scale(1.0006);
  }
  100% {
    -webkit-transform: scale(0.95);
  }
}

@-webkit-keyframes pururin {
  0% {
    -webkit-transform: translate(0, 0px);
  }
  10% {
    -webkit-transform: translate(0, -35px);
  }
  20% {
    -webkit-transform: translate(0, 25px);
  }
  30% {
    -webkit-transform: translate(0, -22px);
  }
  40% {
    -webkit-transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(0, -15px);
  }
  60% {
    -webkit-transform: translate(0, 12px);
  }
  70% {
    -webkit-transform: translate(0, -9px);
  }
  80% {
    -webkit-transform: translate(0, 6px);
  }
  90% {
    -webkit-transform: translate(0, -3px);
  }
  100% {
    -webkit-transform: translate(0, 0px);
  }
}
</style>
