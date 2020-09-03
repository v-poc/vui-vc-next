---
sidebar: auto
title: Progress
preview: https://nikoni.top/vui-vc-next/#/progress-demo
---

Progress circular, generally used to communicate data intuitively to users

## Import

```js
import { VProgressCircular } from 'vui-vc-next'

Vue.component(VProgressCircular.name, VProgressCircular)
```

## API

#### Progress Circular Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|value|progress value|Number|`0`|`0-1`|
|size|circle size|Number|`70`|unit `px`|
|width|circle stroke width|Number|-|unit `px`|
|color|circle stroke highlight color|String|`#fc9153`|-|
|border-color|circle stroke color|String|`rgba(0, 0, 0, .1)`|-|
|fill|circle fill color|String|`transparent`|-|
|linecap|shape of end|String|`round`|`round`, `butt`|
|rotate|-|Number|`0`|-|
|is-animated|Whether show animation when value changes|Boolean|`false`|-|
|duration|transition duration|Number|`1000`|unit `ms`|

#### Progress Circular Slots

##### default
slot inside circle, generally used to add text

##### defs
slot inside circle svg, generally used to add `defs`, `use` elements, etc
