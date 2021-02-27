<template>
  <div class="like-container">
    <div
      :class="cls"
      :style="btnStyle"
      @click="onClickButton"
    >
      <div class="like-wrapper">
        <div class="like-ripple"></div>
        <svg
          class="like-heart"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
        </svg>
        <div
          class="like-particle"
          style="--line-count: 6"
        >
          <div
            v-for="v in 6"
            :key="v"
            class="like-particle-item"
            :style="`--line-index: ${v}`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'

export default {
  name: 'v-like-button',

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
        'like-btn',
        {
          'focus-btn': state.isAddCls
        }
      ]
    })    

    const onClickButton = () => {
      state.isAddCls = true
      setTimeout(() => {
        state.isAddCls = false
        emit('on-click')
      }, 600)
    }

    return {
      state,
      btnStyle,
      cls,
      onClickButton
    }
  }
}
</script>

<style lang="scss">
$heart-color: #f66;
$easing: cubic-bezier(0.7, 0, 0.3, 1);
$duration: 500ms;

.like-container {
  padding: 50px 0;
}

.like-btn {
  position: relative;
  margin: 0 auto;
  z-index: 1;
  border: none;
  border-radius: 100%;
  width: 1em;
  height: 1em;
  appearance: none;
  background-color: #fff;
  cursor: pointer;
  font-size: 200px;
  transition: all $duration $easing;
  outline: none;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    box-shadow: 0 0.3em 0.6em rgba(#000, 0.3);
    content: '';
    transition: inherit;
  }

  &::after {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background-color: #fff;
    content: '';
  }

  &:active {
    &::before {
      animation: depress-shadow $duration $easing both;
    }
  }

  &:focus::after,
  &.focus-btn::after {
    animation: depress $duration $easing both;
  }
}

.like-wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  > * {
    grid-area: 1/1;
    margin: auto;
  }
}

.like-ripple {
  overflow: hidden;
  position: relative;
  border-radius: 100%;
  width: 1em;
  height: 1em;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    border: 0.4em solid $heart-color;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    content: '';
    transform: scale(0);
  }

  .like-btn:focus &,
  .like-btn.focus-btn & {
    &::before {
      animation: ripple-out $duration $easing;
    }
  }
}

.like-heart {
  display: block;
  width: 0.5em;
  height: 0.5em;
  transform-origin: center 80%;

  path {
    transition: all $duration $easing;
    stroke: $heart-color;
    stroke-width: 2;
    fill: transparent;

    .like-btn:focus &,
    .like-btn.focus-btn & {
      fill: $heart-color;
    }
  }

  .like-btn:focus &,
  .like-btn.focus-btn & {
    animation: heart-bounce $duration $easing;
  }
}

.like-particle {
  position: relative;
  width: 1px;
  height: 1px;
}

.like-particle-item {
  --Θ: calc(var(--line-index) / var(--line-count) * 1turn);
  $color-list: #f66 #66f #f90 #09f #9c3 #3c9;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0.05em;
  width: 0.1em;
  height: 0.1em;
  transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0) scaleY(0);
  transition: all $duration $easing;

  @each $v in $color-list {
    $index: index($color-list, $v);

    &:nth-child(#{$index}) {
      background-color: $v;
    }
  }

  .like-btn:focus &,
  .like-btn.focus-btn & {
    // animation: particle-out calc(#{$duration} * 1.2) $easing forwards;
    animation: particle-out 600ms $easing forwards;
  }
}

.like-btn:focus,
.like-btn.focus-btn {
  cursor: normal;
  pointer-events: none;
}

@keyframes depress {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: translateY(5%) scale(0.9);
  }
}

@keyframes depress-shadow {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale(0.5);
  }
}

@keyframes heart-bounce {
  0%,
  80%,
  100% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.7);
  }
}

@keyframes particle-out {
  50% {
    height: 0.3em;
  }
  50%,
  60% {
    height: 0.3em;
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
  }
  60% {
    height: 0.2em;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
  }
}

@keyframes ripple-out {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(5);
  }
}
</style>
