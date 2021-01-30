<template>
  <div class="v-tabs">
    <v-tab-bar
      ref="compRef"
      v-model:value="state.currentName"
      :items="menuItems"
      :has-ink="hasInk"
      :ink-width="inkWidth"
      :immediate="immediate"
      @change="onChangeItem"
    ></v-tab-bar>
    <div class="v-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  ref,
  reactive,
  computed,
  watch,
  provide,
  onMounted
} from 'vue'
import VTabBar from '../tab-bar/index.vue'

export default {
  name: 'v-tabs',

  components: {
    VTabBar
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    hasInk: {
      type: Boolean,
      default: true
    },
    inkWidth: {
      type: Number,
      default: 80
    },
    immediate: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { emit }) {
    const compRef = ref('compRef')

    const state = reactive({
      currentName: props.value,
      prevIndex: 0,
      panes: []
    })

    const menuItems = computed(() => {
      return state.panes.map((pane) => {
        return {
          name: pane.name,
          label: pane.label,
          disabled: pane.disabled
        }
      })
    })

    const currentIndex = computed(() => {
      const index = menuItems.value.findIndex(
        (item) => item.name === state.currentName
      )
      return index === -1 ? 0 : index
    })

    watch(
      () => props.value,
      (val) => {
        if (val !== state.currentName) {
          state.currentName = val
        }
      }
    )

    onMounted(() => {
      if (!state.currentName && menuItems.value.length) {
        state.currentName = menuItems.value[0].name
      }
    })

    const onChangeItem = (tab, index, prevIndex) => {
      if (!tab) {
        return
      }

      state.currentName = tab.name
      state.prevIndex = prevIndex
      emit('update:value', tab.name)
      emit('change', tab)
    }

    const addPane = (item) => {
      if (!item) {
        return
      }

      if (state.panes.indexOf(item) === -1) {
        state.panes.push(item)
      }
    }

    const removePane = (item) => {
      if (!item) {
        return
      }

      const index = state.panes.indexOf(item)
      index >= 0 && state.panes.splice(index, 1)
    }

    const reflowTabBar = () => {
      const comp = compRef && compRef.value
      comp && comp.reflow()
    }

    provide('rootTabs', {
      state,
      currentIndex,
      addPane,
      removePane
    })

    return {
      compRef,
      state,
      menuItems,
      currentIndex,
      onChangeItem,
      addPane,
      removePane,
      reflowTabBar
    }
  }
}
</script>

<style lang="scss">
// @import '../../assets/styles/vui.scss';

.v-tabs-content {
  position: relative;
  width: 100%;
  overflow: hidden;
}
</style>
