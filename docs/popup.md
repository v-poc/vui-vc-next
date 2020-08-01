---
sidebar: auto
title: Popup
preview: 
---

A customized content area pops up on the screen.

## Import

```js
import { VPopup } from 'vui-vc-next'

Vue.component(VPopup.name, VPopup)
```

## API

#### Popup Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|display popup or not|Boolean|`false`|-|
|has-mask|has mask or not|Boolean|`true`|-|
|mask-closable|if the popup will be closed when clicking mask|Boolean|`true`|-|
|position|the position of popup|String|`center`|`center`, `top`, `bottom`, `left`, `right`|
|transition|the animation effect of popup|String|-|`fade`, `fade-bounce`, `fade-slide`, `fade-zoom`<br> `slide-up`, `slide-down`, `slide-left`, `slide-right`|

#### Popup Events

#### @mask-click()
Click upon mask

#### @before-show()
Popup will be shown

#### @show()
Show popup

#### @before-hide()
Popup will be hiden

#### @hide()
Hide popup
