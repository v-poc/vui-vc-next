---
title: ActivityIndicator
preview: https://nikoni.top/vui-vc-next/#/activityindicator-demo
---

Activity indicator, generally used for tasks in progress

## Import

```js
import { VActivityIndicator } from 'vui-vc-next'

app.component(VActivityIndicator.name, VActivityIndicator)
```

## API

#### ActivityIndicator Props
|Props | Description | Type | Default | Note|
|------|------|------|------|------|
|type|-|String|`roller`|`roller`, `spinner`, `carousel`|
|size|The icon size|Number|`70px`|unit `px`, or reset `.md-activity-indicator-svg` style directly|
|width|The icon width|Number|-|unit `px`, only for `roller`|
|color|The icon color|String|`#fc9153/dark`|`spinner` cannot customize color value, the optional values are `dark` and `light`|
|text-color|The text color|String|`#999`|or reset `.md-activity-indicator-text` style directly|
|text-size|The text font size|String|`70px`|or reset `.md-activity-indicator-text` style directly|
|vertical|Whether the icon and text are displayed vertically|Boolean|`false`|-|