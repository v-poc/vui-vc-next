---
title: Watermark
preview: https://nikoni.top/vui-vc-next/#/watermark-demo
---

# VWatermark

Container with watermark background

## Import

```js
import { VWatermark } from 'vui-vc-next'

app.component(VWatermark.name, VWatermark)
```

## API

#### WaterMark Props
|Props | Description | Type | Default | Note |
|----|-----|------|------ |------|
|content|-|String|-|complex content is supported by `scoped slot`|
|spacing|-|String|`20vw`|-|
|repeat-x|-|Boolean|`true`|-|
|repeat-y|-|Boolean|`true`|-|
|rotate|-|String|`-30`|-|
|opacity|-|String|`0.1`|-|

#### WaterMark Slots

##### default
Default slot of content

##### watermark
scoped slot of watermark content

<v-back-top />

<script setup>
import VBackTop from './misc/backTop.vue'
</script>
