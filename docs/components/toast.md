---
title: Toast
preview: https://nikoni.top/vui-vc-next/#/toast-demo
---

# VToast

Toast components for different toast styles

## Import

```js
import { VToast } from 'vui-vc-next'

app.component(VToast.name, VToast)
```

## API

#### Toast Static Methods

##### Toast({value, content, icon, iconSvg, duration, position, hasMask, parentNode})
Dynamically create a toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| value | Whether display toast | Boolean | `false` |-|
| icon | The icon name | String | - | refer to `Icon` component for customized icons|
| iconSvg | Whether use SVG icon | Boolean | `false` |-|
| content | The content of message | String/Number | - |- |
| duration | The toast will be closed in milliseconds; if set duration as `0`, the toast will always be visible | Number | `3000` | - |
| position | The display position | String | `center` | `top/center/bottom` |
| hasMask | Whether display a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | The parent node of toast | HTMLElement | `document.body`| - |

##### Toast.info(content, duration, hasMask, parentNode)
Dynamically create a text toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as `0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.succeed(content, duration, hasMask, parentNode)
Dynamically create a success toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message | String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as `0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.failed(content, duration, hasMask, parentNode)
Dynamically create a failed toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration |toast will be closed in milliseconds; if set duration as `0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.loading(content, duration, hasMask, parentNode)
Dynamically create a loading toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as `0`, the toast will always be visible | Number | `0` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.hide()
Hide current toast

#### Toast.component Props

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| icon | name of icon | String | - | refer to `Icon` component for customized icons|
| iconSvg | use svg icon | Boolean | `false` |-|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as `0`, the toast will always be visible | Number | `3000` | - |
| position | display position | String | `center` | `top/center/bottom` |
| hasMask | whether to show a transparent mask, which will prevent users from clicking| Boolean | `false` | - |

#### Toast.component Methods

##### show()
Show toast

##### hide()
Hide toast

#### Toast.component Events

##### @show()
Toast show event

##### @hide()
Toast hidden event

<v-back-top />

<script setup>
import VBackTop from './misc/backTop.vue'
</script>
