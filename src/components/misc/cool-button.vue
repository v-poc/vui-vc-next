<template>
  <div
    :class="cls"
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
import { computed, reactive, defineComponent } from 'vue'

export default defineComponent({
  name: 'v-cool-button',

  props: {
    scale: {
      type: Number,
      default: 1
    }
  },  

  setup(props, { emit }) {
    const state = reactive({
      isAddCls: false
    })

    const btnStyle = computed(() => {
      const res = {}
      if (props.scale !== 1) {
        res['transform'] = `scale(${props.scale})`
      }
      return res
    })

    const cls = computed(() => {
      return [
        'v-btn-op',
        {
          'pururun': state.isAddCls
        }
      ]
    })    

    const onClickButton = () => {
      state.isAddCls = true
      setTimeout(() => {
        state.isAddCls = false
        emit('on-click')
      }, 2000)
    }

    return {
      state,
      btnStyle,
      cls,
      onClickButton
    }
  }  
})
</script>

<style lang="scss">
.v-btn-star {
  display: block;
  position: absolute;
  top: 3Px;
  left: 11Px;
  z-index: 18;
  color: #c45c3c;
  transform: scale(0.35);
  opacity: 0.5;
}

.v-btn-chi {
  cursor: grabbing;
  position: absolute;
  top: 50Px;
  left: 55Px;
  width: 40Px;
  height: 40Px;
  z-index: 3;
  background: #fac3b4;
  border-radius: 20Px;
  box-shadow: 0 3Px 20Px #ed9c86;
  transform-origin: center center;
  transform: scaleY(0.92) scaleX(0.91);

  &:before {
    position: absolute;
    top: 11Px;
    left: 13Px;
    content: '';
    width: 16Px;
    height: 16Px;
    background: #ffb7a4;
    border-radius: 8Px;
    box-shadow: 0 2Px 5Px #ec8d73;
  }

  &:after {
    position: absolute;
    top: 13Px;
    left: 15Px;
    content: '';
    width: 10Px;
    height: 10Px;
    border-radius: 5Px;
    box-shadow: 0 0 5Px #fff;
  }
}

.v-btn-op {
  cursor: grab;
  position: relative;
  margin: 0 auto;
  width: 150Px;
  height: 150Px;
  background: #ffe0a9;
  border-radius: 75Px;
  transform-origin: center center;
  transform: scaleY(0.95);
  background-image: -webkit-gradient(radial, 50 50, 0, 50 30, 150, from(rgba(255, 255, 255, 0.5)), color-stop(70%, rgba(253, 212, 142, 1)), color-stop(95%, rgba(240, 188, 120, 1)), to(rgba(255, 255, 255, 0))),
    -webkit-gradient(radial, 20 20, 0, 80 80, 90, from(rgba(255, 255, 255, 0.5)), color-stop(50%, rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));
  box-shadow: 0 1Px 10Px rgba(0, 0, 0, 0.1);

  &.pururun {
    animation-name: pururun;
    animation-duration: 1s;
    animation-iteration-count: 2;
    animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
    animation-delay: 0.08s;

    .v-btn-chi {
      animation-name: pururin;
      animation-duration: 1s;
      animation-iteration-count: 2;
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
    }
  }
}

@keyframes pururun {
  0% {
    transform: scale(calc(v-bind(scale) * 0.95));
  }
  10% {
    transform: scale(calc(v-bind(scale) * 1.1));
  }
  20% {
    transform: scale(calc(v-bind(scale) * 0.927));
  }
  30% {
    transform: scale(calc(v-bind(scale) * 1.051));
  }
  40% {
    transform: scale(calc(v-bind(scale) * 0.965));
  }
  50% {
    transform: scale(calc(v-bind(scale) * 1.021));
  }
  60% {
    transform: scale(calc(v-bind(scale) * 0.987));
  }
  70% {
    transform: scale(calc(v-bind(scale) * 1.0027));
  }
  80% {
    transform: scale(calc(v-bind(scale) * 0.9992));
  }
  90% {
    transform: scale(calc(v-bind(scale) * 1.0006));
  }
  100% {
    transform: scale(calc(v-bind(scale) * 0.95));
  }
}

@keyframes pururin {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(0, -35Px);
  }
  20% {
    transform: translate(0, 25Px);
  }
  30% {
    transform: translate(0, -22Px);
  }
  40% {
    transform: translate(0, 18Px);
  }
  50% {
    transform: translate(0, -15Px);
  }
  60% {
    transform: translate(0, 12Px);
  }
  70% {
    transform: translate(0, -9Px);
  }
  80% {
    transform: translate(0, 6Px);
  }
  90% {
    transform: translate(0, -3Px);
  }
  100% {
    transform: translate(0, 0Px);
  }
}
</style>
