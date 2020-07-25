<template>
  <i
    :class="$_cls"
    :style="$_style"
    @click="$_onIconClick"
  ></i>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'v-icon-font',

  props: {
    // The icon name
    name: {
      type: String,
      default: ''
    },
    // The icon size
    size: {
      type: String,
      default: 'md'
    },
    // The icon color
    color: {
      type: String,
      default: ''
    }
  },

  setup(props, { emit }) {
    const $_cls = computed(() => {
      return [
        'm-icon icon-font',
        `m-icon-${props.name}`,
        props.name,
        props.size
      ]
    })

    const $_style = computed(() => {
      return {
        color: props.color
      }
    })

    const $_onIconClick = (evt) => {
      emit('icon-click', evt)
    }

    return {
      $_cls,
      $_style,
      $_onIconClick
    }
  }
})
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.m-icon.icon-font {
  font-family: "VC-Icon" !important;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  letter-spacing: 0;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
}
.m-icon.icon-font.xss {
  // font-size: $icon-size-xxs;
  font-size: 16px;
}
.m-icon.icon-font.xs {
  // font-size: $icon-size-xs;
  font-size: 20px;
}
.m-icon.icon-font.sm {
  // font-size: $icon-size-sm;
  font-size: 24px;
}
.m-icon.icon-font.md {
  // font-size: $icon-size-md;
  font-size: 32px;
}
.m-icon.icon-font.lg {
  // font-size: $icon-size-lg;
  font-size: 42px;
}
.m-icon.icon-font:before {
  position: relative;
  z-index: 2;
}

.m-icon-rectangle:before {
  content: "\e900";
}

.m-icon-invisible:before {
  content: "\e601";
}

.m-icon-visible:before {
  content: "\e602";
}

.m-icon-right:before {
  content: "\e905";
}

.m-icon-wrong:before {
  content: "\e906";
}

.m-icon-info:before {
  content: "\e605";
}

.m-icon-service:before {
  content: "\e606";
}

.m-icon-edit:before {
  content: "\e607";
}

.m-icon-refresh:before {
  content: "\e901";
}

.m-icon-question:before {
  content: "\e608";
}

.m-icon-setting:before {
  content: "\e609";
}

.m-icon-wait:before {
  content: "\e902";
}

.m-icon-check:before {
  content: "\e904";
}

.m-icon-check-disabled:before {
  content: "\e903";
}

.m-icon-checked:before, .m-icon-success:before {
  content: "\e908";
}

.m-icon-clear:before, .m-icon-fail:before {
  content: "\e60e";
}

.m-icon-info-solid:before {
  content: "\e907";
}

.m-icon-warn:before {
  content: "\e60b";
}

.m-icon-security:before {
  content: "\e60f";
}

.m-icon-rmb:before {
  content: "\e610";
}

.m-icon-scan:before {
  content: "\e611";
}

.m-icon-share:before {
  content: "\e612";
}

.m-icon-back:before {
  content: "\e613";
}

.m-icon-card-bag:before {
  content: "\e614";
}

.m-icon-message:before {
  content: "\e615";
}

.m-icon-order:before {
  content: "\e616";
}

.m-icon-balance:before {
  content: "\e617";
}

.m-icon-coupon:before {
  content: "\e618";
}

.m-icon-sort:before {
  content: "\e619";
}

.m-icon-address-book:before {
  content: "\e61a";
}

.m-icon-mobile-phone:before {
  content: "\e61b";
}

.m-icon-home:before {
  content: "\e61c";
}

.m-icon-discovery:before {
  content: "\e61d";
}

.m-icon-calendar:before {
  content: "\e61e";
}

.m-icon-user:before {
  content: "\e61f";
}

.m-icon-time:before {
  content: "\e620";
}

.m-icon-search:before {
  content: "\e621";
}

.m-icon-switch:before {
  content: "\e622";
}

.m-icon-camera:before {
  content: "\e623";
}

.m-icon-clock:before {
  content: "\e624";
}

.m-icon-profession:before {
  content: "\e625";
}

.m-icon-delete:before {
  content: "\e626";
}

.m-icon-id-card:before {
  content: "\e627";
}

.m-icon-filter:before {
  content: "\e628";
}

.m-icon-location:before {
  content: "\e629";
}

.m-icon-authentication:before {
  content: "\e62a";
}

.m-icon-motor-vehicle:before {
  content: "\e62b";
}

.m-icon-phone:before {
  content: "\e62c";
}

.m-icon-volumn:before {
  content: "\e62d";
}

.m-icon-arrow-left:before {
  content: "\e603";
}

.m-icon-arrow-right:before {
  content: "\e630";
}

.m-icon-arrow-up:before {
  content: "\e633";
}

.m-icon-arrow-down:before {
  content: "\e634";
}

.m-icon-close:before {
  content: "\e604";
}

@font-face {
  font-family: VC-Icon;
  font-style: normal;
  font-weight: normal;
  src: $icon-font-family;
}
</style>
