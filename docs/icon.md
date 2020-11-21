---
title: Icon
preview: https://nikoni.top/vui-vc-next/#/icon-demo
---

Icons (IconFont/SVG icon)

## Import

```js
import { VIcon } from 'vui-vc-next'

app.component(VIcon.name, VIcon)
```

## API

#### Icon Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|name|The icon name|String|-|-|
|size|The icon size|String|`md`|`xs`, `sm`, `md`, `lg`|
|color|The icon color|String|`currentColor`|this color value is set as the value of `fill` on the `svg` icon|
|svg|Whether use SVG icon|Boolean|`false`|-|
