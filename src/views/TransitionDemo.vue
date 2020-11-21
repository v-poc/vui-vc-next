<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div
    class="v-example"
    v-for="(item, index) in effects"
    :key="`effect${index}`"
  >
    <p>Transition - {{ item }}</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup(index, true)"
    >{{ detailInfo(item) }}</v-button>
    <v-popup
      v-model:value="popupShow[index]"
      :transition="convertName(item)"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>{{ detailInfo(item) }}</p>
        <img v-lazy="'https://nikoni.top/images/others/mj.png'" />
      </div>
    </v-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
// import VPopup from '../components/popup/index.vue'
// import VButton from '../components/button/index.vue'

export default {
  name: 'transition-demo',

  inheritAttrs: false,

  // components: {
  //   VPopup,
  //   VButton
  // },

  setup() {
    const effects = ref([
      'Fade',
      'Fade Up',
      'Fade Down',
      'Fade Left',
      'Fade Right',
      'Bounce',
      'Punch',
      'Zoom',
      'Slide Up',
      'Slide Down',
      'Slide Left',
      'Slide Right'
    ])
    const popupShow = ref({})

    const showPopup = (index, isShow) => {
      popupShow.value[index] = isShow
    }

    const detailInfo = (name) => {
      const arr = name.split(' ')
      arr.length > 1 && arr.splice(1, 0, 'from')
      return arr.length === 1 ? name : arr.join(' ')
    }

    const convertName = (name) => {
      const arr = name.split(' ')
      const nameLowerCase = arr.map((item) => item.toLowerCase()).join('-')
      return `v-${nameLowerCase}`
    }

    return {
      effects: effects.value,
      popupShow: popupShow.value,
      showPopup,
      detailInfo,
      convertName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
