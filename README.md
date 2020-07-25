# bin-ace-editor

基本的代码编辑器插件

## Docs

[document](https://wangbin3162.gitee.io/bin-ace-editor/)

## 如何使用

1. Install

    ```
    npm install --save-dev bin-ace-editor
    ```
    
2. 在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import Editor from 'bin-ace-editor';
import App from './App.vue';


// 注册组件后即可使用
Vue.component(Editor.name, Editor)

new Vue({
  el: '#app',
  render: h => h(App)
});
```
    
3. 使用

    ```html
    <b-ace-editor v-model="content" lang="html" theme="chrome" width="500" height="100"></b-ace-editor>
    ```
    
    prop `v-model`  is required
    
    prop `lang` and `theme` is same as [ace-editor's doc](https://github.com/ajaxorg/ace)
    
    prop `height` and `width` could be one of these:  `200`, `200px`, `50%`
    
5. Access the ACE's instance

    `<b-ace-editor ref='myEditor'>`

    `let editor = this.$refs.myEditor.editor`
    
    or
    
    ```
    editorInit: function (editor) {
    
    }
    ```
