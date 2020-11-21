---
title: Chart
preview: https://nikoni.top/vui-vc-next/#/chart-demo
---

Chart made with SVG, supports polylines printing and display setting.

## Import

```js
import { VChart } from 'vui-vc-next'

app.component(VChart.name, VChart)
```

## API

#### Chart Props
| Props | Description | Type | Default | Required |
|----|-----|------|------|------|
| size | The size of chart, the value can be a string or number with unit (px)| Array | `[480, 320]` | - |
| max | The maximum in Y-Axis | Number | Leave it as blank to automatically calculate the maximum in the dataset | - |
| min | The minimum in Y-Axis | number | Leave it as blank to automatically calculate the minimum in the dataset | - |
| lines | The number of lines in Y-Axis | Number | `5` | - |
| step | The decreasing step in Y-Axis | Number | Leave it as blank to automatically compute the avarage based on `lines`,`max` and `min`| - |
| format | The labels formatting function in Y-Axis | Function | `val => val` | - |
| labels | The labels of X-Axis | Array | - | required |
| datasets | The chart data, the format is shown as follows | Array | - | required|
| shift | The shift in Y-Axis | Number | 0.6 | - |

#### `datasets`
Array of objects, each object defines a set of polyline-relevant attributes.

```js
{
  color: '#ff5858', // storke color, optional, default color is orange
  theme: 'heat',    // theme, the value could be 'heat' or 'region', default value is empty
  width: 1,         // width, optional, default value is 1
  values: [15, 20]  // array
}
```
