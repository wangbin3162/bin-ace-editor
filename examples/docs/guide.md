## 介绍

bin-ace-editor已更新至3.0版本，以支持vue3.0，旧版本更新至2.0.0以与vue2版本对应。推荐更新最新版


### 最新版本

[![NPM version](https://img.shields.io/npm/v/bin-ace-editor.svg)](https://www.npmjs.com/package/bin-ace-editor)

## 安装

### npm 安装

推荐使用npm安装，它能更好地和[webpack](https://webpack.js.org/)打包工具配合使用。而且可以更好的和
es6配合使用。并且支持按需引入

```shell
npm i bin-ace-editor -S
# or 
yarn add bin-ace-editor
```

如果您了解node.js、npm安装，并希望配合webpack使用，请阅读下一节：[快速上手](/#/start)。

## 引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import Editor from 'bin-ace-editor';
import App from './App.vue';

// 按需引入需要的语言包皮肤等资源
require('brace/ext/emmet') // 如果是lang=html时需引入
require('brace/ext/language_tools') // language extension

require('brace/mode/json')
require('brace/snippets/json')
require('brace/theme/chrome')
// 注册组件后即可使用
Vue.component(Editor.name, Editor)

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### CDN 安装

快速构建一个编辑器需要依赖 [ace-builds](https://github.com/ajaxorg/ace-builds/) 构建，去下载对应资源放置到项目中或使用cdn

```
<script src="../lib/bin-ace-editor/src-min-noconflict/ace.js"></script>
<script src="../lib/bin-ace-editor/src-min-noconflict/ext-beautify.js"></script>
<script src="../lib/bin-ace-editor/src-min-noconflict/ext-language_tools.js"></script>
<script src="../lib/bin-ace-editor/src-min-noconflict/mode-json.js"></script>
<script src="../lib/bin-ace-editor/src-min-noconflict/snippets/json.js"></script>

<script src="../lib/bin-ace-editor/bin-ace-editor.min.js"></script>
```

上面五个是依赖，根据需要实现的语言类型引入


推荐使用npm方式来进行使用，这样可以更好的配合webpack进行构建

### 相关链接

- [bin-ui](https://github.com/wangbin3162/bin-ui/) bin-ui 组件库
- [bin-tree-org](https://github.com/wangbin3162/bin-tree-org/) 树形组织组件
- [bin-animation](https://github.com/wangbin3162/bin-animation/) css3动画库
- [bin-keyframe-animation](https://github.com/wangbin3162/bin-keyframe-animation/) js关键帧动画库
- [bin-admin](https://github.com/wangbin3162/bin-admin/) 后台管理系统admin2.0版本
- [bin-data](https://github.com/wangbin3162/bin-data/) 大数据可视化系统平台
- [bin-static-web](https://github.com/wangbin3162/bin-static-web/) 静态页面脚手架
- [vue-admin](https://github.com/wangbin3162/vue-admin/) admin1.0版本(无登录)
