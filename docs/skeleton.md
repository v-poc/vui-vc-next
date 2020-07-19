---
sidebar: auto
title: Skeleton
preview: 
---

Skeleton screen, generally used to display the loading state of the general structure of the page before the data has been loaded

## Import

```js
import { VSkeleton } from 'vui-vc-next'

Vue.component(VSkeleton.name, VSkeleton)
```

## API

#### Skeleton Props
| Props | Description | Type | Default | Note |
|------|---------|------|------|------------|
|loading|Whether display the skeleton placeholders loading|Boolean|true|-|
|avatar|Whether display avatar placeholders|Boolean|false|-|
|avatar-size|The size of avatar placeholders|String|md| sm, md, lg |
|title|Whether display the title placeholders|Boolean|false|-|
|title-width|The width of title placeholders|Number, String| 40%|-|
|row|The number of rows|Number|3|-|
|row-width|The width of rows|String, Number, Array\<String\|Number\>|100%|-|
