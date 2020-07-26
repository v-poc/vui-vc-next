<template>
  <i :class="$_cls" :style="$_style" @click="$_onIconClick"></i>
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
        'v-icon icon-font',
        `v-icon-${props.name}`,
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

.v-icon.icon-font {
  font-family: 'VC-Icon' !important;
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
.v-icon.icon-font.xss {
  // font-size: $icon-size-xxs;
  font-size: 16px;
}
.v-icon.icon-font.xs {
  // font-size: $icon-size-xs;
  font-size: 20px;
}
.v-icon.icon-font.sm {
  // font-size: $icon-size-sm;
  font-size: 24px;
}
.v-icon.icon-font.md {
  // font-size: $icon-size-md;
  font-size: 32px;
}
.v-icon.icon-font.lg {
  // font-size: $icon-size-lg;
  font-size: 42px;
}
.v-icon.icon-font:before {
  position: relative;
  z-index: 2;
}

.v-icon-rectangle:before {
  content: '\e900';
}

.v-icon-invisible:before {
  content: '\e601';
}

.v-icon-visible:before {
  content: '\e602';
}

.v-icon-right:before {
  content: '\e905';
}

.v-icon-wrong:before {
  content: '\e906';
}

.v-icon-info:before {
  content: '\e605';
}

.v-icon-service:before {
  content: '\e606';
}

.v-icon-edit:before {
  content: '\e607';
}

.v-icon-refresh:before {
  content: '\e901';
}

.v-icon-question:before {
  content: '\e608';
}

.v-icon-setting:before {
  content: '\e609';
}

.v-icon-wait:before {
  content: '\e902';
}

.v-icon-check:before {
  content: '\e904';
}

.v-icon-check-disabled:before {
  content: '\e903';
}

.v-icon-checked:before,
.v-icon-success:before {
  content: '\e908';
}

.v-icon-clear:before,
.v-icon-fail:before {
  content: '\e60e';
}

.v-icon-info-solid:before {
  content: '\e907';
}

.v-icon-warn:before {
  content: '\e60b';
}

.v-icon-security:before {
  content: '\e60f';
}

.v-icon-rmb:before {
  content: '\e610';
}

.v-icon-scan:before {
  content: '\e611';
}

.v-icon-share:before {
  content: '\e612';
}

.v-icon-back:before {
  content: '\e613';
}

.v-icon-card-bag:before {
  content: '\e614';
}

.v-icon-message:before {
  content: '\e615';
}

.v-icon-order:before {
  content: '\e616';
}

.v-icon-balance:before {
  content: '\e617';
}

.v-icon-coupon:before {
  content: '\e618';
}

.v-icon-sort:before {
  content: '\e619';
}

.v-icon-address-book:before {
  content: '\e61a';
}

.v-icon-mobile-phone:before {
  content: '\e61b';
}

.v-icon-home:before {
  content: '\e61c';
}

.v-icon-discovery:before {
  content: '\e61d';
}

.v-icon-calendar:before {
  content: '\e61e';
}

.v-icon-user:before {
  content: '\e61f';
}

.v-icon-time:before {
  content: '\e620';
}

.v-icon-search:before {
  content: '\e621';
}

.v-icon-switch:before {
  content: '\e622';
}

.v-icon-camera:before {
  content: '\e623';
}

.v-icon-clock:before {
  content: '\e624';
}

.v-icon-profession:before {
  content: '\e625';
}

.v-icon-delete:before {
  content: '\e626';
}

.v-icon-id-card:before {
  content: '\e627';
}

.v-icon-filter:before {
  content: '\e628';
}

.v-icon-location:before {
  content: '\e629';
}

.v-icon-authentication:before {
  content: '\e62a';
}

.v-icon-motor-vehicle:before {
  content: '\e62b';
}

.v-icon-phone:before {
  content: '\e62c';
}

.v-icon-volumn:before {
  content: '\e62d';
}

.v-icon-arrow-left:before {
  content: '\e603';
}

.v-icon-arrow-right:before {
  content: '\e630';
}

.v-icon-arrow-up:before {
  content: '\e633';
}

.v-icon-arrow-down:before {
  content: '\e634';
}

.v-icon-close:before {
  content: '\e604';
}

@font-face {
  font-family: VC-Icon;
  font-style: normal;
  font-weight: normal;
  src: $icon-font-family;
}
</style>
