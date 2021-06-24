## 介绍

bin-ace-editor现已更新至3.0.0+版本，为适应vue3+ ，原支持vue2.6版本的editor已拉分支保存，最新保存版本为`2.0.0`版本

### 最新版本

[![NPM version](https://img.shields.io/npm/v/bin-ace-editor.svg)](https://www.npmjs.com/package/bin-ace-editor)

## 安装

## 安装

通过[unpkg.com/bin-ace-editor](https://unpkg.com/bin-ace-editor/) 可以看到 bin-ace-editor
最新版本的资源，也可以切换版本选择需要的资源，在页面上引入 js 和 css
文件即可开始使用：

```javascript
<!-- import Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- import bin-ace-editor -->
<script src="https://unpkg.com/bin-ace-editor@3.0.0/lib/index.min.js"></script>
```

`@3.0.0` 表示版本号3.0依赖vue3.0+ ,`@2.0.0` 表示版本号2.0依赖vue2.6 ,

### npm 安装

推荐使用npm安装，它能更好地和[webpack](https://webpack.js.org/)打包工具配合使用。而且可以更好的和
es6配合使用。并且支持按需引入

```shell
npm i bin-ace-editor -S
# or 
yarn add bin-ace-editor
```

## 引入

在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import Editor from 'bin-ace-editor';
import App from './App.vue';

// 按需引入需要的语言包皮肤等资源
require('brace/ext/emmet') // 如果是lang=html时需引入
require('brace/ext/language_tools') // language extension

require('brace/mode/json')
require('brace/snippets/json')
require('brace/theme/chrome')
const app = createApp(App)
app.component(Editor.name, Editor)
app.mount('#app', true)
```

### CDN 安装

快速构建一个编辑器需要依赖 [ace-builds](https://github.com/ajaxorg/ace-builds/) 构建，去下载对应资源放置到项目中或使用cdn

```javascript
<script src="../lib/bin-ace-editor/src-min-noconflict/ace.js"></script>
<script src="../lib/bin-ace-editor/src-min-noconflict/ext-beautify.js"></script>
<script src="../lib/bin-ace-editor/src-min-noconflict/ext-language_tools.js"></script>
<script src="../lib/bin-ace-editor/src-min-noconflict/mode-json.js"></script>
<script src="../lib/bin-ace-editor/src-min-noconflict/snippets/json.js"></script>

<script src="../lib/bin-ace-editor/bin-ace-editor.min.js"></script>
```

上面五个是依赖，根据需要实现的语言类型引入


推荐使用npm方式来进行使用，这样可以更好的配合webpack进行构建
