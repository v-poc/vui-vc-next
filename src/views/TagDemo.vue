<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Tag - Demo colors</p>
    <v-tag
      v-for="(cMap, cKey) in computedColors"
      :key="cKey"
      type="fill"
      size="large"
      shape="circle"
      :fill-color="cMap.base || '#EFEFEF'"
      @click="showPopup('center', true, cKey, cMap)"
    >{{ cKey }}</v-tag>
    <v-popup
      position="center"
      transition="v-bounce"
      :value="popupShow.center"
      @input="val => showPopup('center', val, null, null)"
    >
      <div class="v-example-popup v-example-popup-center">
        <h3>{{ popupShow.cKey }}</h3>
        <ul>
          <li
            v-for="(subValue, subKey) in popupShow.cMap"
            :key="subKey"
            :class="rowCls(subKey)"
            :style="rowStyle(subValue)"
          >
            <span class="caption">
              <span v-if="popupShow.cKey !== 'shades'">{{ popupShow.cKey }}</span>
              <span v-if="subKey !== 'base'">{{ formatSubColorKey(subKey) }}</span>
            </span>
            <span v-if="subValue !== 'transparent'">
              {{ subValue.toUpperCase() }}
            </span>
          </li>
        </ul>
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <p>Tag Shape - Circle</p>
    <v-tag
      type="fill"
      size="small"
      shape="circle"
      fill-color="#FC5353"
    >100</v-tag>
    <v-tag
      type="fill"
      size="small"
      shape="circle"
      fill-color="#36C"
      font-color="#FFF"
    >promotion</v-tag>
    <v-tag
      type="ghost"
      size="small"
      shape="circle"
    >10%</v-tag>
    <v-tag
      type="fill"
      size="small"
      shape="circle"
      sharp="bottom-right"
      fill-color="#36C"
      font-color="#FFF"
    >half price</v-tag>
  </div>
  <div class="v-example">
    <p>Tag Shape - Special</p>
    <v-tag
      type="fill"
      shape="coupon"
      fill-color="#36C"
      font-color="#FFF"
    >Coupon Ticket</v-tag>
    <v-tag
      type="fill"
      shape="quarter"
      fill-color="#FC9191"
      font-color="#FFF"
    >&times;</v-tag>
    <v-tag
      type="fill"
      shape="bubble"
      fill-color="#999"
      font-color="#FFF"
    >88</v-tag>
  </div>
  <div class="v-example">
    <p>Tag Shape - No fill color</p>
    <v-tag
      type="fill"
      shape="square"
      fill-color
    >&pound;100</v-tag>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
// import VTag from '../components/tag/index.vue'
// import VPopup from '../components/popup/index.vue'
import colors from '../constants/colors'
import { kebab, formatColor } from '../utils/index'

export default {
  name: 'tag-demo',

  inheritAttrs: false,

  // components: {
  //   VTag,
  //   VPopup
  // },

  setup() {
    const popupShow = ref({})

    // show/hide popup
    const showPopup = (pos, isShow, cKey, cMap) => {
      const popupShowVal = popupShow.value
      popupShowVal[pos] = isShow

      const setVal = () => {
        popupShowVal['cKey'] = cKey
        popupShowVal['cMap'] = cMap
      }

      if (isShow) {
        setVal()
      } else {
        setTimeout(setVal, 200)
      }
    }

    const computedColors = computed(() => {
      const colorsMap = {}

      Object.keys(colors).forEach((key) => {
        const kebabKey = kebab(key)
        colorsMap[kebabKey] = colors[key]
      })

      return colorsMap
    })

    const rowCls = (colorKey) => {
      return [
        'row-item',
        `${/darken|base|black/.test(colorKey) ? 'white-text' : 'black-text'}`
      ]
    }

    const rowStyle = (colorValue) => {
      return {
        'background-color': colorValue
      }
    }

    const formatSubColorKey = (colorKey) => formatColor(colorKey)

    return {
      computedColors,
      popupShow: popupShow.value,
      showPopup,
      rowCls,
      rowStyle,
      formatSubColorKey
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example-popup {
  width: 80vw;

  h3 {
    margin-bottom: 0.3rem;
  }

  .row-item {
    padding: 0.2rem;
    display: flex;

    span {
      font-size: 50%;
    }

    span.caption {
      margin-left: 0;
      display: flex;
      flex: 1;
    }
  }

  .white-text {
    color: #FFF;
  }

  .black-text {
    color: #000;
  }  
}
</style>
