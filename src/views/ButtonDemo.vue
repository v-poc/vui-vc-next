<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Basic Button</p>
    <v-button type="default">Default Button</v-button>
    <v-button
      type="default"
      inactive
    >Default Button (inactive)</v-button>
    <v-button
      type="primary"
      icon="security"
      round
    >Primary Button</v-button>
    <v-button
      type="primary"
      inactive
    >Primary Button (inactive)</v-button>
  </div>
  <div class="v-example">
    <p>Button Text link</p>
    <v-button
      type="link"
      inactive
    >
      Inactive text button with Icon
      <v-icon
        name="arrow-right"
        size="xs"
      ></v-icon>
    </v-button>
    <v-button
      type="link"
      icon="message"
    >Message text</v-button>
  </div>
  <div class="v-example">
    <p>Button w loading state</p>
    <v-button
      type="default"
      plain
      loading
    >Plain Loading Button</v-button>
    <v-button
      type="primary"
      round
      loading
    >Round Loading Button</v-button>
  </div>
  <div class="v-example">
    <p>Cool Button</p>
    <v-button
      type="warning"
      size="small"
      inline
      round
      @click="showPopup('center', true)"
    >Test Cool button</v-button>
    <v-popup
      position="center"
      transition="v-bounce"
      v-model:value="popupShow.center"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Touch center point</p>
        <v-cool-button
          :scale="1.1"
          @on-click="onClickCoolButton"
        />
      </div>
    </v-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import Toast from '../components/toast/index'
import VCoolButton from '../components/misc/cool-button.vue'
// import VButton from '../components/button/index.vue'
// import VIcon from '../components/icon/index.vue'
// import VPopup from '../components/popup/index.vue'

export default {
  name: 'button-demo',

  inheritAttrs: false,

  components: {
    VCoolButton
    //   VButton,
    //   VIcon,
    //   VPopup
  },

  setup() {
    const popupShow = ref({})

    // show/hide popup
    const showPopup = (pos, isShow) => {
      popupShow.value[pos] = isShow
    }

    const onClickCoolButton = () => {
      Toast({
        icon: 'warn',
        content: 'So cool, nice feeling!',
        position: 'top'
      })
    }

    return {
      popupShow: popupShow.value,
      showPopup,
      onClickCoolButton
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
