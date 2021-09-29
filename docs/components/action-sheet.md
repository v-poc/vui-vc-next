---
title: ActionSheet
preview: https://nikoni.top/vui-vc-next/#/actionsheet-demo
---

# VActionSheet

Bottom ActionSheet screen that is able to support different operations.

## Import

```js
import { VActionSheet } from 'vui-vc-next'

app.component(VActionSheet.name, VActionSheet)
```


## API

#### ActionSheet Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|------|
|v-model|display ActionSheet or not|Boolean|`false`|-|
|title|title of ActionSheet|String|-|-|
|options|options of ActionSheet|Array<{label, value}>| [] |-|
|default-index|default selected index|Boolean|0|-|
|invalid-index|invalid index|Number|-1|-|
|cancel-text|cancel text|String|`Cancel`|-|
|large-radius|large radius|Boolean|`true`|-|

#### ActionSheet Events

##### @selected(item)
Select event

|Props | Description | Type |
|----|-----|------|
|item|selected value|`Object: {label, value}`|

##### @cancel()

Cancel selection

##### @show()

Show ActionSheet

##### @hide()

Hide ActionSheet

<v-back-top />

<script setup>
import VBackTop from './misc/backTop.vue'
</script>
