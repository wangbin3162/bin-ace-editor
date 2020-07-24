## 介绍

更新重构了代码编辑器组件和底层依赖，现已支持更多代码类型。并已正式更名为bin-ace-editor,
原代码编辑器`bin-code-editor`停止更新，保留至0.9.0版本。


### 最新版本

[![NPM version](https://img.shields.io/npm/v/bin-ace-editor.svg)](https://www.npmjs.com/package/bin-ace-editor)


### 相关链接

- [bin-ui](https://github.com/wangbin3162/bin-ui/) bin-ui 组件库
- [bin-tree-org](https://github.com/wangbin3162/bin-tree-org/) 树形组织组件
- [bin-animation](https://github.com/wangbin3162/bin-animation/) css3动画库
- [bin-keyframe-animation](https://github.com/wangbin3162/bin-keyframe-animation/) js关键帧动画库
- [bin-admin](https://github.com/wangbin3162/bin-admin/) 后台管理系统admin2.0版本
- [bin-data](https://github.com/wangbin3162/bin-data/) 大数据可视化系统平台
- [bin-static-web](https://github.com/wangbin3162/bin-static-web/) 静态页面脚手架
- [vue-admin](https://github.com/wangbin3162/vue-admin/) admin1.0版本(无登录)

## 安装

### CDN 安装

通过[unpkg.com/bin-ace-editor](https://unpkg.com/bin-ace-editor/) 可以看到 bin-ace-editor
最新版本的资源，也可以切换版本选择需要的资源，在页面上引入 js 和 css
文件即可开始使用：

```
<!-- import Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/bin-ace-editor@0.1.0/lib/styles/index.css">
<!-- import bin-ace-editor -->
<script src="https://unpkg.com/bin-ace-editor@0.1.0/lib/bin-ace-editor.min.js"></script>
```
    
`@0.1.0` 表示版本号，我们建议锁定版本号来保证代码的稳定性

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

Vue.use(Editor);

new Vue({
  el: '#app',
  render: h => h(App)
});
```


