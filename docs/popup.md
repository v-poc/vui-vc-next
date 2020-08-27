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

#### PopupTitleBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|The title of popup title bar|String|-|-|
|describe|The description of popup title bar|String|-|-|
|ok-text|The confirmation text|String|-|no confirmation button if empty|
|cancel-text|The cancellation text|String|-|no cancellation button if empty|
|large-radius|Whether display large radius|Boolean|`false`|-|
|only-close|Whether display right close button only|Boolean|`false`|-|
|title-align|The position of title and description|String|`center`|note that `left` and `right` will hide the left and right buttons respectively|


#### Popup Events

##### @mask-click()
Click upon mask

##### @before-show()
Popup will be shown

##### @show()
Show popup

##### @before-hide()
Popup will be hiden

##### @hide()
Hide popup
