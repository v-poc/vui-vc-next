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
      src="https://vuejs.org/images/logo.png"
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

export default {
  name: 'one-piece-demo',

  inheritAttrs: false,

  components: {
    VHelloWorld
  },

  setup() {
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
</style>
