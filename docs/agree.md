---
title: Agree
preview: https://nikoni.top/vui-vc-next/#/agree-demo
---

The agree control that supports toggling state.

## Import

```js
import { VAgree } from 'vui-vc-next'

app.component(VAgree.name, VAgree)
```

## API

#### Agree Props
| Props | Description | Type | Default |
|----|-----|------|------|------|
| v-model | checked | Boolean | `false` |-|
| disabled | - | Boolean | `false` |-|
| size | size of icon | String | `md` | refer to `VIcon` for optional values |

#### Agree Instance Events

##### @change(name, checked)
Invoked when checked state is changed
