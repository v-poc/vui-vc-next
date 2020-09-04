<template>
  <div class="v-result">
    <div class="v-result-image">
      <img
        v-if="$_actualImgUrl"
        :src="$_actualImgUrl"
        :class="$_cls"
      />
      <v-icon
        v-else
        name="no-result"
        size="lg"
        svg
      ></v-icon>
    </div>
    <div
      class="v-result-text"
      v-if="$_actualText"
      v-text="$_actualText"
    ></div>
    <div
      class="v-result-subtext"
      v-if="$_actualSubText"
      v-text="$_actualSubText"
    ></div>
    <div
      class="v-result-buttons"
      v-if="buttons.length"
    >
      <v-button
        v-for="(btn, index) in buttons"
        :key="index"
        :type="btn.type"
        :plain="btn.plain"
        :round="btn.round"
        :inactive="btn.inactive"
        :loading="btn.loading"
        :icon="btn.icon"
        :icon-svg="btn.iconSvg"
        size="small"
        inline
        @click="btn.handler"
      >
        {{ btn.text }}
      </v-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import VButton from '../button/index.vue'
import VIcon from '../icon/index.vue'

export default {
  name: 'v-result-page',

  components: {
    VButton,
    VIcon
  },

  props: {
    // The page type (lost/network/empty)
    type: {
      type: String,
      default: 'empty'
    },
    // The image url
    imgUrl: {
      type: String,
      default: ''
    },
    // The main text
    text: {
      type: String,
      default: ''
    },
    // The sub text
    subText: {
      type: String,
      default: ''
    },
    // The button list
    buttons: {
      type: Array,
      default: () => []
    }
  },

  setup(props) {
    const $_cls = computed(() => {
      return {
        [props.type]: !props.imgUrl
      }
    })

    const $_actualImgUrl = computed(() => {
      if (props.imgUrl) {
        return props.imgUrl
      }
      return ''
    })

    const $_actualText = computed(() => {
      if (props.text) {
        return props.text
      }
      const txtMap = {
        network: 'Network issue',
        empty: 'No result',
        lost: '404'
      }
      return txtMap[props.type] || ''
    })

    const $_actualSubText = computed(() => {
      if (props.subText) {
        return props.subText
      }
      const txtMap = {
        lost: 'The page you visited does not exist.'
      }
      return txtMap[props.type] || ''
    })

    return {
      $_cls,
      $_actualImgUrl,
      $_actualText,
      $_actualSubText
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-result {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
}

.v-result-image {
  width: $result-page-image-size;

  img {
    width: 100%;
    margin-bottom: 0.4rem;
  }

  .v-icon.icon-svg.v-icon-no-result.lg {
    width: 1.3rem;
    height: 0.7rem;
  }  
}

.v-result-text {
  margin: 0.2rem 0.2rem 0 0;
  color: $result-page-title-color;
  font-size: $result-page-title-font-size;
}

.v-result-subtext {
  margin: 0.16rem 0 0.2rem 0;
  color: $result-page-describe-color;
  font-size: $result-page-describe-font-size;
}

.v-result-buttons {
  display: flex;

  .v-button {
    margin: 0.1rem;
  }
}
</style>
