<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Icon Font</p>
    <div
      class="v-example-row"
      v-for="item in state.iconList"
      :key="item"
    >
      <v-icon
        color="green"
        :name="item.split('/')[0]"
      ></v-icon>
      <span>{{ item }}</span>
    </div>
    <v-button
      v-if="state.iconList.length < 4"
      type="primary"
      size="small"
      inline
      round
      @click="showMoreIconList"
    >Show more</v-button>
  </div>
  <div class="v-example">
    <p>Icon Size</p>
    <div class="v-example-item">
      <v-icon
        name="location"
        size="xs"
      ></v-icon>
      <p>xs</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="location"
        size="sm"
      ></v-icon>
      <p>sm</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="location"
        size="md"
      ></v-icon>
      <p>md</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="location"
        size="lg"
      ></v-icon>
      <p>lg</p>
    </div>
  </div>
  <div class="v-example">
    <p>Icon Color</p>
    <div class="v-example-item">
      <v-icon
        name="triangle"
        color="orange"
      ></v-icon>
      <p>Orange</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="triangle"
        color="blue"
      ></v-icon>
      <p>Blue</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="triangle"
        color="purple"
      ></v-icon>
      <p>Purple</p>
    </div>
  </div>
  <div class="v-example">
    <p>Icon SVG</p>
    <div
      class="v-example-svg"
      v-for="svgIcon in state.svgList"
      :key="svgIcon"
    >
      <v-icon
        :name="svgIcon"
        :class="{ 'v-example-invert': svgIcon === 'spinner' }"
        size="lg"
        svg
      ></v-icon>
      <span>{{ svgIcon }}</span>
    </div>
    <v-button
      v-if="state.svgList.includes('spinner')"
      type="primary"
      size="small"
      inline
      round
      @click="showMoreSvgList"
    >View more</v-button>
  </div>
</template>

<script>
import { reactive, onUnmounted } from 'vue'
// import VIcon from '../components/icon/index.vue'
// import VButton from '../components/button/index.vue'
import { SVG_SPRITE_NODE_ID } from '../constants/index'
import loadSvgSprite from '../utils/loadSvgSprite'

export default {
  name: 'icon-demo',

  inheritAttrs: false,

  // components: {
  //   VIcon,
  //   VButton
  // },

  setup() {
    const state = reactive({
      iconList: ['checked/success', 'check-disabled', 'clear/fail'],
      svgList: ['spinner', 'warn-color', 'success-color', 'no-result']
    })

    const showMoreIconList = () => {
      state.iconList = [
        'rectangle',
        'right',
        'wrong',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrow-down',
        'invisible',
        'visible',
        'service',
        'setting',
        'close',
        'refresh',
        'edit',
        'sort',
        'info',
        'question',
        'security',
        'rmb',
        'wait',
        'check',
        'checked/success',
        'check-disabled',
        'clear/fail',
        'warn',
        'info-solid',
        'scan',
        'share',
        'back',
        'card-bag',
        'message',
        'order',
        'balance',
        'coupon',
        'address-book',
        'mobile-phone',
        'calendar',
        'home',
        'discovery',
        'switch',
        'time',
        'search',
        'user',
        'camera',
        'clock',
        'delete',
        'profession',
        'id-card',
        'authentication',
        'location',
        'filter',
        'motor-vehicle',
        'phone',
        'volumn'
      ]
    }

    const showMoreSvgList = () => {
      const res = {
        'svg-vite':
          '<svg width="80" height="80" viewBox="0 0 504 504" fill="none"><path d="M446.641 136.525L262.643 465.545C258.844 472.338 249.084 472.378 245.228 465.618L57.5817 136.556C53.3809 129.19 59.6802 120.267 68.0281 121.759L252.223 154.682C253.398 154.892 254.601 154.89 255.776 154.676L436.119 121.806C444.439 120.289 450.768 129.143 446.641 136.525Z" fill="url(#paint0_linear)"/><path d="M339.965 78.5744L203.801 105.255C201.563 105.694 199.906 107.59 199.771 109.866L191.395 251.33C191.198 254.662 194.258 257.248 197.51 256.498L235.42 247.749C238.967 246.931 242.172 250.055 241.443 253.622L230.18 308.775C229.422 312.487 232.907 315.661 236.532 314.56L259.947 307.446C263.577 306.344 267.065 309.527 266.297 313.242L248.398 399.875C247.278 405.294 254.486 408.249 257.492 403.603L259.5 400.5L370.454 179.072C372.312 175.364 369.108 171.137 365.036 171.923L326.014 179.454C322.347 180.161 319.227 176.746 320.262 173.158L345.731 84.8669C346.767 81.2731 343.636 77.8552 339.965 78.5744Z" fill="url(#paint1_linear)"/><defs><linearGradient id="paint0_linear" x1="53.0002" y1="110" x2="282" y2="421" gradientUnits="userSpaceOnUse"><stop stop-color="#41D1FF"/><stop offset="1" stop-color="#BD34FE"/></linearGradient><linearGradient id="paint1_linear" x1="241.651" y1="85.8182" x2="283.076" y2="369.989" gradientUnits="userSpaceOnUse"><stop stop-color="#FFEA83"/><stop offset="0.0833333" stop-color="#FFDD35"/><stop offset="1" stop-color="#FFA800"/></linearGradient></defs></svg>',
        'svg-recording':
          '<svg width="55" height="80" viewBox="0 0 55 80" fill="#2f86f6"><g transform="matrix(1 0 0 -1 0 80)"><rect width="10" height="20" rx="3"><animate attributeName="height" begin="0s" dur="4.3s" values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear" repeatCount="indefinite" /></rect><rect x="15" width="10" height="80" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite" /></rect><rect x="30" width="10" height="50" rx="3"><animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite" /></rect><rect x="45" width="10" height="30" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite" /></rect></g></svg>',
        'svg-message':
          '<svg width="40" height="40"><g fill="#2E2D2D" fill-rule="evenodd"><path d="M10 35.899c1.369-.79 2.743-1.58 4.111-2.371a1.377 1.377 0 0 1 1.136-.15l.021.006a18.57 18.57 0 0 0 7.865.348 18.198 18.198 0 0 0 4.757-1.507 17.286 17.286 0 0 0 2.912-1.763 16.288 16.288 0 0 0 2.467-2.282 15.604 15.604 0 0 0 1.874-2.649c.254-.455.485-.924.69-1.403A14.457 14.457 0 0 0 37 18.5a14.416 14.416 0 0 0-1.167-5.63 15.083 15.083 0 0 0-2.564-4.052 16.092 16.092 0 0 0-2.467-2.282 16.79 16.79 0 0 0-1.412-.954 17.746 17.746 0 0 0-4.655-1.968 18.577 18.577 0 0 0-9.467 0 18.085 18.085 0 0 0-3.155 1.159c-.512.246-1.013.515-1.5.809A16.774 16.774 0 0 0 7.901 7.62a15.883 15.883 0 0 0-2.184 2.487A15.346 15.346 0 0 0 4.17 12.87a14.413 14.413 0 0 0-.886 2.852A14.162 14.162 0 0 0 3 18.5c0 .932.101 1.862.284 2.776a14.455 14.455 0 0 0 1.212 3.56 1.5 1.5 0 1 1-2.691 1.324C-2.282 17.851.85 8.412 8.399 3.434c7.336-4.837 17.307-4.554 24.314.787 7.227 5.508 9.538 15.166 4.84 23.136-4.552 7.722-13.987 11.064-22.468 9.073l-5.829 3.367a1.5 1.5 0 0 1-2.249-1.299v-7C7.007 30.67 7.672 30 8.5 30c.828 0 1.5.67 1.5 1.498v4.401"/><path d="M18.5 17h3a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 1 0-3M31.5 17a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 1 0-3h3M11.5 17a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 1 0-3h3"/></g></svg>',
        'svg-github':
          '<svg height="24" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>',
        'svg-trolley':
          '<svg viewBox="0 0 35 39"><path d="M3.63 5h22.363c5.789 0 9.278 4.972 8.312 10.342L32.6 24.037c-.56 3.69-4.112 5.893-7.9 5.893H5.27C4.513 29.93 4 29.274 4 28.52c0-.756.615-1.52 1.37-1.52H24.7c2.58 0 4.874-1.242 5.203-3.408l1.713-8.732C32.293 11.094 29.999 8 25.993 8H2.553C1.748 8 1.108 7.772.99 7.026L.017 1.581a1.367 1.367 0 1 1 2.699-.428L3.63 5zM3.5 16h12a1.5 1.5 0 0 1 1.5 1.5v.047a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V17.5A1.5 1.5 0 0 1 3.5 16zM7 39a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm20 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill-rule="evenodd"/></svg>'
      }
      loadSvgSprite(res)
      state.svgList = Object.keys(res)
    }

    onUnmounted(() => {
      const svgNode = document.getElementById(SVG_SPRITE_NODE_ID)
      svgNode && svgNode.parentNode.removeChild(svgNode)
    })

    return {
      state,
      showMoreIconList,
      showMoreSvgList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-icon.icon-svg {
  &.v-icon-svg-vite.lg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &.v-icon-svg-recording.lg {
    width: 1.2rem;
    height: 1rem;
  }

  &.v-icon-svg-message.lg {
    width: 1rem;
    height: 0.8rem;
  }

  &.v-icon-svg-github.lg {
    width: 0.5rem;
    height: 0.5rem;
  }

  &.v-icon-svg-trolley.lg {
    width: 0.45rem;
    height: 0.45rem;
  }

  &.v-icon-no-result.lg {
    width: 1.3rem;
    height: 0.8rem;
  }
}
</style>
