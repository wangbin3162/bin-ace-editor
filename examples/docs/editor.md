## Editor 编辑器

<template>
    <div class="global-anchor">
      <b-anchor :scroll-offset="100">
        <b-anchor-link href="#ji-chu-yong-fa" title="基础用法"></b-anchor-link>
        <b-anchor-link href="#jie-hebin-ui-biao-dan" title="结合bin-ui表单"></b-anchor-link>
        <b-anchor-link href="#duo-chong-yu-fa-zhi-chi" title="多种语法支持"></b-anchor-link>
        <b-anchor-link href="#props" title="配置参数"></b-anchor-link>
        <b-anchor-link href="#events" title="事件"></b-anchor-link>
      </b-anchor>
    </div>
</template>

### 基础用法

代码编辑器，默认支持多种语法，内部实现了按需引入，使用的时候只需要设置lang就可以，具体参数配置看以下代码

::: demo
```html
<template>
    <b-row>
      <b-col span="12">
        <b-ace-editor v-model="jsonStr"
                      lang="json"
                      width="100%"
                      height="300"
                      :theme="theme"
                      :readonly="readonly"
                      :font-size="fontSize"></b-ace-editor>
      </b-col>
      <b-col span="12">
        <div class="pl-15">
          <div class="pl-15">
            <p>
              文字大小：
              <b-input-number v-model="fontSize" :min="12" :max="16" size="small"/>
              只读：
              <b-switch v-model="readonly"/>
            </p>
            <p>皮肤：
              <b-radio-group v-model="theme">
                <div>
                  <b-radio v-for="item in themeList" :key="item" :label="item"></b-radio>
                </div>
              </b-radio-group>
            </p>
            <div style="padding: 8px 0;">
              <b-button type="primary" @click="modal = true">弹窗编辑</b-button>
              <b-button type="primary" @click="handleZip">压缩</b-button>
              <b-button type="primary" @click="handleFormat">格式化</b-button>
              <b-modal v-model="modal" title="弹窗编辑" transition-name="fade-down">
                <b-ace-editor v-model="jsonStr" height="400"></b-ace-editor>
              </b-modal>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
</template>
<script>
  const jsonData = {
    title:'测试json数据',
    child:[
        {
            title:'子项名称1',
            desc:'子项描述1'
        },
        {
            title:'子项名称2',
            desc:'子项描述2'
        }
    ]
  }

  export default {
    data() {
      return {
        jsonStr: JSON.stringify(jsonData, null, 2),
        modal: false,
        readonly: false,
        theme: 'chrome',
        fontSize: 12,
        themeList: [
          'chrome',
          'xcode',
          'clouds',
          'crimson_editor',
          'sqlserver',
          'github',
          'textmate',
          'tomorrow',
          'solarized_light',
          'cobalt',
          'dracula',
          'monokai',
          'solarized_dark',
          'terminal',
          'vibrant_ink'
        ],
      }
    },
    methods: {
      handleZip() {
        this.jsonStr = JSON.stringify(JSON.parse(this.jsonStr), null, 0)
      },
      handleFormat() {
        this.jsonStr = JSON.stringify(JSON.parse(this.jsonStr), null, 2)
      }
    }
  }
</script>
```
:::

### 结合bin-ui表单

可以结合表单给出错误提示,需要有额外的样式覆盖

```css
.bin-form-item-error > .bin-form-item-content .bin-ace-editor {
    border-color: #f5222d !important;
}
```

::: demo
```html
<template>
 <b-form :model="template" ref="form" :rules="ruleValidate" :label-width="130">
    <b-form-item label="脚本" prop="tempSource">
      <b-ace-editor v-model="template.tempSource" height="240"></b-ace-editor>
    </b-form-item>
    <b-form-item >
      <b-button type="primary" @click="handleSubmit">提交</b-button>
    </b-form-item>
  </b-form>
</template>
<script>
  const jsonData = {
    title:'测试json数据',
    child:[
        {
            title:'子项名称1',
            desc:'子项描述1'
        },
        {
            title:'子项名称2',
            desc:'子项描述2'
        }
    ]
  }

  export default {
    data() {
      const checkObj=(rule, value, callback)=>{
        try {
         if(JSON.parse(value.trim())){
          callback()
         }   
        }catch (e) { 
          callback('不是标准json')
        }
      } 
      return {
        ruleValidate: {
          tempSource: [{ required: true, message: '必填项', trigger: 'blur' },{ validator:checkObj, trigger: 'blur' }]
        },
        template:{
          tempSource:''
        }   
      }
    },
    methods: {
      handleSubmit() {
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.$message({type:'success',content:'校验成功'})
            }else{
              this.$message({type:'danger',content:'校验失败'})
            } 
          })
      }
    }
  }
</script>
```
:::

### 多种语法支持

支持多种常用语法设置，默认是按需加载

::: demo
```html
<template>
<div>
    <b-row :gutter="20">
      <b-col span="8">
        <b-tag type="primary">json</b-tag>
        <b-ace-editor v-model="jsonStr" height="300" lang="json" snippets></b-ace-editor>
      </b-col>
      <b-col span="8">
        <b-tag type="success">javascript</b-tag>
        <b-ace-editor v-model="javascriptStr" height="300" lang="javascript" snippets></b-ace-editor>
      </b-col>
      <b-col span="8">
        <b-tag type="warning">markdown</b-tag>
        <b-ace-editor v-model="markdownStr" height="300" lang="markdown" snippets></b-ace-editor>
      </b-col>
    </b-row>
    <br/>
    <b-row :gutter="20">
      <b-col span="8">
        <b-tag type="primary">sql</b-tag>
        <b-ace-editor v-model="sqlStr" height="300" lang="sql" wrap></b-ace-editor>
      </b-col>
      <b-col span="8">
        <b-tag type="success">java</b-tag>
        <b-ace-editor v-model="javaStr" height="300" lang="java"></b-ace-editor>
      </b-col>
      <b-col span="8">
        <b-tag type="warning">elixir</b-tag>
        <b-ace-editor v-model="elixirStr" height="300" lang="elixir"></b-ace-editor>
      </b-col>
    </b-row>
    <br/>
    <b-row :gutter="20">
      <b-col span="8">
        <b-tag type="primary">html</b-tag>
        <b-ace-editor v-model="htmlStr" height="300" lang="html"></b-ace-editor>
      </b-col>
      <b-col span="8">
        <b-tag type="success">css</b-tag>
        <b-ace-editor v-model="cssStr" height="300" lang="css"></b-ace-editor>
      </b-col>
      <b-col span="8">
        <b-tag type="warning">stylus</b-tag>
        <b-ace-editor v-model="stylusStr" height="300" lang="stylus"></b-ace-editor>
      </b-col>
    </b-row>
</div>
</template>
<script>
const jsonData = {
    title:'测试json数据',
    child:[
        {
            title:'子项名称1',
            desc:'子项描述1'
        },
        {
            title:'子项名称2',
            desc:'子项描述2'
        }
    ]
  }

const javascriptStr = `let a = 0;
function add(){
  a ++;
}
add();
console.log(a);`

const markdownStr = `# 一级标题

## Markdown模式编辑

  - 编辑器可以支持多种语言
  - 支持多种样式皮肤
  - 支持多种参数设置

## 安装

\`\`\`bash

# 安装依赖
npm install b-code-editor

\`\`\`
`

const sqlStr = 'SELECT * from sys_user where user_name = \'test\''

const javaStr = `public class Test {
    public static void main(String[] args) {
        System.out.println("hello word");
    }
}`

const elixirStr = `{
 "query": {
      "bool": {
        {{#gatherDept}}
        "filter": {
          {{#isDomain}}
          "prefix": {
            "create_dept": "{{gatherDept}}"
          }
          {{/isDomain}}
          {{^isDomain}}
          "term": {
            "create_dept": {
              "value": "{{gatherDept}}"
            }
          }
          {{/isDomain}}
        },
        {{/gatherDept}}
        "must": [
          {
            "term": {
              "flag": {
                "value": "1"
              }
            }
          }
        ]
      }
    },
  "size": 0,
  "aggs": {
    "date_filter": {
      "filter": {
        "range": {
          "create_date": {
            "format": "yyyy-MM",
            "gte": "{{startDate}}",
            "lte": "{{endDate}}"
          }
        }
      },
      "aggs": {
        "month_count": {
          "date_histogram": {
            "field": "create_date",
            "format": "yyyy-MM",
            "calendar_interval": "month",
            "min_doc_count": 0,
            "extended_bounds": {
              "min": "{{startDate}}",
              "max": "{{endDate}}"
            }
          }
        }
      }
    }
  }
}`

const htmlStr = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>测试</title>
<style>
  h1{
    color:red;
  }
</style>
</head>
<body>
    <h1>我是一个标题</h1>
    <p>我是一个段落。</p>
</body>
</html>`

const cssStr = `.test{
  font-size: 12px;
}`

const stylusStr = `.test{
  font-size: 12px;
  .child{
    border: 1px solid #1089ff;
  }
}`

  export default {
    data() {
      return {
        jsonStr: JSON.stringify(jsonData, null, 2),
        javascriptStr: javascriptStr,
        markdownStr: markdownStr,
        sqlStr: sqlStr,
        javaStr: javaStr,
        elixirStr: elixirStr,
        htmlStr: htmlStr,
        cssStr: cssStr,
        stylusStr: stylusStr
      }
    }
  }
</script>
```
:::

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value    | 绑定数据，可用v-model   | String  |  —   |   0  |
| lang   | 语言模式   | String  |  json/javascript/java/sql/elixir/html/css...   |   json  |
| theme   | 皮肤样式   | String  | 'chrome','xcode','clouds', 'dracula'等  |   chrome  |
| width    | 默认编辑器宽度  | String  |  —   |   100%  |
| height    | 默认编辑器高度  | String  |  —   |   400px  |
| font-size | 字符大小   | Number  | -  |   12  |
| readonly   | 只读模式   | Boolean  | -  |   false  |
| wrap | 代码换行   | Boolean  | -  |   false  |
| snippets |  代码片段提示自动填充   | Boolean  | -  | false  |
| options    | 其他配置项  | Object  |  —  |  —  |
| styles    | 样式覆盖，可以设置无边框间距等，如需要更改不同主题的颜色，则需要一些额外的样式覆盖  | Object  |  —  |  —  |

### Events

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| change    | 输入项改变事件   | value  |
| init   | 默认初始化完毕后调用   | -  |
