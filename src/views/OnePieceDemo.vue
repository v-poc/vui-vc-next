<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Click logo/text to view OnePiece</p>
  </div>
  <div class="v-example-poc">
    <p @click="showPopup(true)">VUI POC</p>
    <img
      alt="Vue logo"
      v-lazy="'https://vuejs.org/images/logo.png'"
      @click="showPopup(true)"
    />
    <v-hello-world
      ref="compRef"
      msg="Hello VUI"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import VHelloWorld from '../components/misc/hello-world.vue'
import useLazyLoadImage from '../composables/useLazyLoadImage'

export default {
  name: 'one-piece-demo',

  inheritAttrs: false,

  components: {
    VHelloWorld
  },

  setup() {
    const lazyImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAC0CAYAAADhNHIFAAAACXBIWXMAAAsSAAALEgHS3X78AAAELklEQVR4nO3cvWplVQBH8aOSQRtrC2srizBvIFZhnELxFWzUwY9KsLBTUAxaiJWVVj6ATDflgC8g2DoOzBXGkelE2FYXQkwkOcG7rmuvAz/I/SjWLv5NEvYyxliSXA0ekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHjCLP+/eHQ+vXx+/Xbs2NstyIT8/+9x49ZN74+j40aXc/PKPceu7x+On+38N+tyzwANm8fDw8MID2vr14Onx5nt3Lj2krbe+fTzoc88CD5jF5uDg0kPaLMv47PXPVw/plS8eDfrcs8ADZrFmRJtlGXdeeGn1kI6OG9Ku4AGzWDuke9eeGTc/fdCQ9hweMIu1Q9osy3jn1u2GtOfwgFlcZUhf3fioIe05PGAWVxnS7RdvjKPj3xvSHsMDZtGQ3PCAWTQkNzxgFg3JDQ+YxWZZxvY5ayynPzv5+vSQts/p16efhrQ7eMAs/ssh/dv79LlngQfMoiG54QGzOG8wF3mvIe0/PGAWDckND5hFQ3LDA2Zx3khO/tyQ/r/wgFk0JDc8YBbnDWWMs3+Ld/I7J4e0fc754+s/PqPPPQs8YBZrhnT6e9vnvAGd9T363LPAA2bRvwi54QGzaEhueMAsGpIbHjCLqwzpm5ffXzWihrQ7eMAsrjKkD974viHtOTxgFmtH9OCJJ8drH//SkPYcHjCLtRdE/vj84eoRdUHk7uABs1hzZfFmWcbXRx+uHlJXFu8OHjCLNZfo33/qYLz79g+XHlCX6O8eHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGOABiQEekBjgAYkBHpAY4AGJAR6QGPwNCkDEYD4wSGEAAAAASUVORK5CYII='
    // register v-lazy directive
    useLazyLoadImage({
      loading: lazyImage,
      error: lazyImage,
      reset: true
    })

    const compRef = ref('compRef')

    const showPopup = (val) => {
      const comp = compRef && compRef.value
      comp && comp.showPopup(val)
    }

    return {
      compRef,
      showPopup
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

::v-deep(.v-tag) {
  .size-large {
    font-size: 0.5rem;
  }
}

::v-deep(.v-landscape-content) {
  width: 100vw;
}

::v-deep(.v-progress) {
  margin-top: 0.2rem;

  span.unit {
    font-size: 0.25rem;
  }
}

::v-deep(.v-example-op) {
  padding-top: 1.5rem;
  height: 5.5rem;
}

.v-example-poc {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50%;
  }
}

::v-deep(.v-example-op-default) {
  height: 3.5rem;
  background: #fff;
}

@media (min-width: 640px) {
  .v-example-poc img {
    width: 4rem;
  }
}
</style>
