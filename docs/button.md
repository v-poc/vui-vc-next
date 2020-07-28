---
sidebar: auto
title: Button
preview: 
---

Button components for different button styles

## Import

```js
import { VButton } from 'vui-vc-next'

Vue.component(VButton.name, VButton)
```

## API

#### Button Props
|Props | Description | Type | Default | Note |
|----|-----|------|------ |------|
|type|The theme type|String|`default`|`default`, `primary`, `warning`, `disabled`, `link`|
|native-type|The button type|String|`button`|-|
|size|The size of button|String|`large`|`large`, `small`|
|plain|The plain state|Boolean|`false`|-|
|round|The round radius state|Boolean|`false`|-|
|inline|The inline state|Boolean|`false`|-|
|icon|The icon of button|String|-|refer to `Icon` for optional values|
|icon-svg|Whether use svg icon|Boolean|`false`|-|
|inactive|The inactive state|Boolean|`false`|The button is not clickable which is inactive or disabled. The former is generally used for subjective factors such as invalid form validation, and the latter is used for objective factors such as no permission or no inventory|
|loading|The loading state|Boolean|`false`|not ready yet|

#### Button Events

##### @click(event)
Button click event
