---
title: Tabs
preview: https://nikoni.top/vui-vc-next/#/tabbar-demo
---

# VTabs

The Tabs screen with a content area

## Import

```js
import { VTabs, VTabPane } from 'vui-vc-next'

app.component(VTabs.name, VTabs)
app.component(VTabPane.name, VTabPane)
```

## API

### Tabs Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|name of selected tab|String|-|-|
|immediate|trigger a `change` event immediately after initialization|Boolean|`false`|-|

### TabPane Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|name|unique name|String|-|required|
|label|tab label|String|-|required|
|disabled|disable pane|Boolean|`false`|-|

### Tabs Methods

#### reflowTabBar()
relayout tabbar

### Tabs Events

#### @change(tab)
when user selects tab

|Props | Description | Type|
|----|-----|------|
| tab | object of selected tab | `Object:{name: String, label: String, disabled: Boolean}`|

<v-back-top />

<script setup>
import VBackTop from './misc/backTop.vue'
</script>
