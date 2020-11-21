---
title: ActionBar
preview: https://nikoni.top/vui-vc-next/#/actionbar-demo
---

Bottom sidebar with text or action buttons that can present form information or submit form data.

ActionBar is fixed at the bottom of the page by `position: fixed`. In order to avoid the page content being overlap, we need to reserve a blank space (not less than `100px`) at the bottom (the iPhone also needs to add `constant(safe-area-inset-bottom)`).

## Import

```js
import { VActionBar } from 'vui-vc-next'

app.component(VActionBar.name, VActionBar)
```

## API

#### ActionBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|actions|button group|Array\<ActionOptions\>|-|-|

#### ActionOptions Props

|Props | Description | Type | Default |
|----|-----|------|------|
|text|-|String|-|
|disabled|-|Boolean|`false`|
|onClick|click handler|Function(action: ActionOptions)|-|
|type|-|String|`disabled` when the prop `disabled` is true, otherwise is `primary`|
|plain|-|Boolean|`false` for the last one and `true` for the others|
|round|-|Boolean|`false`|
|icon|icon name|String|-|
|iconSvg|use svg icon|Boolean|`false`|
|inactive|-|Boolean|`false`|
|loading|-|Boolean|`false`|

#### ActionBar Events

##### @click(action)
Button click event

|Props | Description | Type |
|----|-----|------|
|action|object corresponding to the clicked button in the actions list|Object: ActionOptions|
