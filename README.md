# vui-vc-next (aka VUI.next)

[![npm](https://img.shields.io/npm/v/vui-vc-next)](https://www.npmjs.com/package/vui-vc-next) <a href="https://nikoni.top/vui-vc-next/" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=3366cc" alt="docs & demos" /></a>

> Yet another **lightweight** and **Vite-powered** Mobile web UI components based on **Vue 3** and **Vite 2**.

## Contains

- [x] [Vue](https://v3.vuejs.org/) [![npm](https://img.shields.io/npm/v/vue/next.svg)](https://www.npmjs.com/package/vue/v/next)
- [x] [Vue Router](https://router.vuejs.org/) [![npm](https://img.shields.io/npm/v/vue-router/next.svg)](https://www.npmjs.com/package/vue-router/v/next)
- [x] [Vite](https://github.com/vitejs/vite) [![npm](https://img.shields.io/npm/v/vite.svg)](https://www.npmjs.com/package/vite) [![node](https://img.shields.io/node/v/vite.svg)](https://nodejs.org/en/about/releases/)
  - [x] [Vue 3 SFC support via @vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue) [![npm](https://img.shields.io/npm/v/@vitejs/plugin-vue.svg)](https://npmjs.com/package/@vitejs/plugin-vue)
  - [x] [HMR](https://vitejs.dev/guide/features.html#hot-module-replacement)
  - [x] [Dev Server Proxy](https://vitejs.dev/config/#server-proxy)
  - [x] [Library Mode](https://vitejs.dev/guide/build.html#library-mode)
  - [x] [CSS Pre-processors](https://vitejs.dev/guide/features.html#css-pre-processors)
    - [x] [Sass](https://sass-lang.com/) [![npm](https://img.shields.io/pub/v/sass.svg)](https://www.npmjs.com/package/sass)
  - [x] [PostCSS](https://vitejs.dev/guide/features.html#postcss)
    - [x] [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) [![npm](https://badge.fury.io/js/postcss-pxtorem.svg)](https://www.npmjs.com/package/postcss-pxtorem)
- [x] [Vitepress](https://github.com/vuejs/vitepress) [![npm](https://img.shields.io/npm/v/vitepress)](https://www.npmjs.com/package/vitepress)

## Preview

Try [QR code SFC playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHRlbXBsYXRlPlxuICA8aDE+VlVJLm5leHQ8L2gxPlxuICA8aDM+c2NhbiB0aGUgUVIgY29kZSB0byBhY2Nlc3MgdGhlIGV4YW1wbGVzIG9uIG1vYmlsZS90YWJsZXQgZGV2aWNlOjwvaDM+XG4gIDxkaXYgdi1odG1sPVwiaW1nXCI+PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHFyY29kZSBmcm9tICd2LXFyLWNvZGUtbmV4dCdcblxuY29uc3QgdHlwZU51bWJlciA9IDgsIGVycm9yQ29ycmVjdGlvbkxldmVsID0gJ0wnXG5jb25zdCBxciA9IHFyY29kZSh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3Rpb25MZXZlbClcbnFyLmFkZERhdGEoJ2h0dHBzOi8vbmlrb25pLnRvcC92dWktdmMtbmV4dC8nKS5tYWtlKClcblxuY29uc3QgaW1nID0gcXIuY3JlYXRlSW1nVGFnKClcbjwvc2NyaXB0PlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidi1xci1jb2RlLW5leHRcIjogXCJodHRwczovL3VucGtnLmNvbS92LXFyLWNvZGUtbmV4dEAwLjEuNi9kaXN0L3YtcXItY29kZS1uZXh0LmVzLmpzXCJcbiAgfVxufSJ9) to access the examples on mobile/tablet device:

<img src="https://nikoni.top/images/vui-vc-qrcode.png" alt="VUI Examples" width="222" height="242"/>

## Status

- More UI components WIP based on Vue 3.
- Currently JavaScript version only, will provide TypeScript codebase in next major version.
- About project test, will provide unit/e2e test in next major version.

## Usage

Select the components you need to build your web App. Please check [VUI-POC](https://github.com/bluepower/vui-poc) for some reference.

[VUI (based on vue3)](https://github.com/bluepower/vui-vc-next) is able to run in cross-platform solutions by [Taro3](https://github.com/NervJS/taro). Please check [VUI-Taro](https://github.com/bluepower/vui-taro) for some reference.
- miniprogram (weapp/swan/alipay/tt/qq/jd) - `zh-CN` project
- quickapp - `zh-CN` project
- h5
- react native

> The mobile-first responsive-UI is also fit for desktop web.
>
> `VUI.next` is for `Vite 2.x` (Library Mode) and onward. Vite 1.x's demo is [archived](https://www.npmjs.com/package/vui-vc-next?activeTab=versions).

## Project setup

### How to setup your project
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production

#### build lib
```
npm run build
```

#### build demo
```
npm run build-demo
```

## Project docs - [VUI-docs](https://nikoni.top/vui-vc-next/docs)

### Compiles docs for development
```
npm run dev-docs
```

### Compiles and minifies docs for production
```
npm run build-docs
```

## Customize configuration

About vite and vitepress, please check Configuration Reference - [vite](https://vitejs.dev/config/), [vitepress](https://vitepress.vuejs.org).

## License

<img src="https://nikoni.top/images/niko-mit.png" alt="MIT License" width="396" height="250"/>
