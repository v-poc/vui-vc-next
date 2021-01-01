---
title: TabBar
preview: https://nikoni.top/vui-vc-next/#/tabbar-demo
---

# VTabBar

The TabBar screen without a content area

## Import

```js
import { VTabBar } from 'vui-vc-next'

app.component(VTabBar.name, VTabBar)
```

## API

#### TabBar Props
| Props | Description | Type | Default | Notes |
|----|-----|------|------|------|
| v-model | key of selected menu | String | - | - |
| items |menus data|Array<{name: String, label: String, disabled: Boolean}>|-|-|
| has-ink | display underline ink bar | Boolean | `true` | - |
| ink-width | the width of ink bar | Number | `80` | the percentage width of ink bar, between `0-100` |
| immediate |trigger a `change` event immediately after initialization|Boolean|`false`|-|

#### TabBar Methods

##### reflow()
relayout TabBar

#### TabBar Events

##### @change(item, index, prevIndex)
selected item index changes

| Props | Description | Type |
|----|-----|------|
| item | object of previous selected menu | Object |
| index | index of current selected menu | Number |
| index | index of previous selected menu | Number |
