---
title: Tag
preview: https://nikoni.top/vui-vc-next/#/tag-demo
---

# VTag

Tag UI showing the area status 

## Import

```js
import { VTag } from 'vui-vc-next'

app.component(VTag.name, VTag)
```

## API

#### Tag Props
| Props | Description | Type | Default | Note |
|------|---------|------|------|------------|
|size|The size of tag|String|`large`|`tiny`, `small`, `large`|
|shape|The shape of tag|String|`square`|`square`, `circle`, `fillet`, `quarter`, `coupon`|
|type|The style of tag|String|`ghost`|`fill`, `ghost`|
|sharp|The angle of tag|String|-|`top-left`, `top-right`, `bottom-left`, `bottom-right`|
|fill-color|The background color of tag|String|`rgba(0,0,0,0)`|`rgba` or `hex number`|
|font-color|The font color of tag|String|`#fc9153`|`rgba` or `hex number`|
|font-weight|The font weight of tag|String|`normal`|`normal`, `bold`, `bolder`|
