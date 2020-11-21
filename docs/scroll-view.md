---
title: ScrollView
preview: https://nikoni.top/vui-vc-next/#/scrollview-demo
---

ScrollView screen is able to simulate native scrolling areas and support pull-down refresh and load more

## Import

```js
import { VScrollView } from 'vui-vc-next'

app.component(VScrollView.name, VScrollView)
```

## Instruction

* `ScrollViewRefresh` is a pull-down refresh component built into the component library for visual display only. It needs to be used in the slot `refresh`. The pull-down refresh component can also be customized.

* `ScrollViewMore` load-more component built into the component library for visual display only. It needs to be used in slot `more`. The load-more component can also be customized.

## API

#### ScrollView Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|scrolling-x | horizontal scrolling | Boolean | `true` | -|
|scrolling-y | vertical scrolling | Boolean | `true` | -|
|bouncing | - | Boolean | `true` | -|
|auto-reflow| automatically reset scroller size when content changes | Boolean | `false` | manually call `reflowScroller` when set to `false` and it is recommended to turn `auto-reflow` off when `ScrollView` is hidden, otherwise the last scroll position will not be saved|
|manual-init | manual initialization | Boolean | `false` | generally used for asynchronous initialization scenarios, you need to manually call the `init` method to complete the initialization |
|end-reached-threshold | threshold for emitting `end-reached`. | Number | 0 | unit `px` |
|immediate-check-end-reaching | check if it reaches the bottom at initialization | Boolean | `false` | - |
|touch-angle | angle value range that triggers scrolling | Number | 45 | unit `deg` |
|is-prevent | prevent browser default scrolling | Boolean | `true` | if set to `false`, the browser defaults to scroll when scrolling is triggered over a non-scrollable angle range |

#### ScrollViewRefresh Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|scroll-top | distance from top | Number | `0` | unit `px` |
|is-refresh-active | release refreshable state | Boolean | `false` | - |
|is-refreshing | refreshing state | Boolean | `false` | - |
|refresh-text | - | String | `Pull-to-refresh` | - |
|refresh-active-text | release refreshable text | String | `Release-to-refresh` | - |
|refreshing-text | refreshing text | String | `Refreshing...` | - |
|roller-color | progress bar color | String | `#2F86F6` | - |

#### ScrollViewMore Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|is-finished | all loaded | Boolean | `false` | - |
|loading-text | loading text | String | `Loading more...` | - |
|finished-text | loaded text | String | `Already loaded.` | - |
