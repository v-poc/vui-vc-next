---
sidebar: auto
title: Landscape
preview: https://nikoni.top/vui-vc-next/#/landscape-demo
---

The display screen in a floating layer

## Import

```js
import { VLandscape } from 'vui-vc-next'

Vue.component(VLandscape.name, VLandscape)
```

## API

#### Landscape Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|----- |
|v-model|display popup layer or not|Boolean|`false`| - |
|has-mask|has mask or not|Boolean|`true`| - |
|mask-closable|if popup layer can be closed through clicking on the mask|Boolean|`false`| - |
|full-screen|whether display as full screen|Boolean|`false`| - |
| transition | the animation effect of dialog | String | when `full-screen` is `true`, the default value is `v-fade`;otherwise the default value is `v-punch` |

#### Landscape Events

##### @mask-click()
Click upon mask

##### @show()
Display popup

##### @hide()
Hide popup
