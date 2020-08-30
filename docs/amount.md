---
sidebar: auto
title: Amount
preview: 
---

Financial figures screen, generally for amounts and quantities, etc

## Import

```js
import { VAmount } from 'vui-vc-next'

Vue.component(VAmount.name, VAmount)
```

## API

#### Amount Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|value|-|The number value|`0`|-|
|precision|-|The number precision|`2`|length of decimal part|
|is-round-up|Whether the number should be round up|Boolean|`true`|-|
|has-separator|Whether the thousand separator is existing|Boolean|`false`|-|
|separator|The thousand separator|String|`,`|-|
|is-capital|Whether the number should be converted to Chinese capital|Boolean|`false`|-|
|is-animated|Whether show animation when value changes|Boolean|`false`|-|
|duration|The animation duration|Number|`1000`|unit `ms`|