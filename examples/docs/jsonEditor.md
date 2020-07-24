## JsonEditor 编辑器

### 基础用法

注意，初始化如果有数据，则会默认格式化一次，格式化快捷键默认为`F7`,使用时可以进行格式化结构

::: demo
```html
<template>
<div>
  <b-code-editor v-model="jsonStr" :indent-unit="4" height="auto"/>
</div>
</template>
<script>
  const jsonData = `{"title":"测试json数据","children":[{"name":"子项名称", "desc":"子项说明" },{"name":"子项名称1", "desc":"子项说明1" }]}`

  export default {
    data() {
      return {
        jsonStr: jsonData
      }
    }
  }
</script>
```
:::

### 其他配置项

`JSON.stringify(JSON.parse(jsonData),null,2)`可以将默认json进行预格式化,也可以手动触发formatCode()来格式化

::: demo
```html
<template>
<div flex="box:mean">
  <div> 
     <b-code-editor v-model="jsonStr" :theme="theme" :auto-format="false"
        ref="editor"
      :show-number="showNumber" :readonly="readonly" :lint="lint"/>
  </div>
  <div class="pl-15">
     <p>
        行号：<b-switch v-model="showNumber" />  
        只读：<b-switch v-model="readonly" />  
        检查：<b-switch v-model="lint" />
     </p>
     <p><b-button @click="$refs['editor'].formatCode()">手动触发格式化</b-button></p>
     <p>皮肤：
        <b-radio-group v-model="theme">
           <b-radio label="idea"><span>idea</span></b-radio>
           <b-radio label="eclipse"><span>eclipse</span></b-radio>
           <b-radio label="duotone-light"><span>duotone-light</span></b-radio>
           <b-radio label="mdn-like"><span>mdn-like</span></b-radio>
           <b-radio label="xq-light"><span>xq-light</span></b-radio>
        </b-radio-group>
        <b-radio-group v-model="theme">
           <b-radio label="dracula"><span>dracula</span></b-radio>
           <b-radio label="rubyblue"><span>rubyblue</span></b-radio>
           <b-radio label="monokai"><span>monokai</span></b-radio>
           <b-radio label="material"><span>material</span></b-radio>
           <b-radio label="material-darker"><span>material-darker</span></b-radio>
        </b-radio-group>
    </p>
  </div>
</div>
</template>
<script>
  const jsonData = `{"title":"测试json数据","children":[{"name":"子项名称", "desc":"子项说明" },{"name":"子项名称1", "desc":"子项说明1" }]}`

  export default {
    data() {
      return {
        jsonStr: JSON.stringify(JSON.parse(jsonData),null,2),
        showNumber: true,
        lint: true,
        readonly: false,
        wrap: true,
        theme: 'idea'
      }
    }
  }
</script>
```
:::

### 弹窗使用

弹窗使用时有注意事项 ，窗口打开是使用  `@on-opened="$refs.editor.refresh()"`进行刷新

::: demo
```html
<template>
<div>
    <b-button type="primary" @click="openJsonModal">导入json</b-button>
    <b-modal v-model="jsonModal" title="导入Json" :z-index="50" width="750px"
             @on-opened="$refs.editor.refresh()"  @on-ok="importJson">
      <b-code-editor ref="editor" v-model="jsonStr"/>
    </b-modal>
</div>
</template>
<script>
  const jsonData = `{"title":"测试json数据","children":[{"name":"子项名称", "desc":"子项说明" },{"name":"子项名称1", "desc":"子项说明1" }]}`

  export default {
    data() {
      return {
        jsonModal: false,
        jsonStr:''
      }
    },
    methods:{
      openJsonModal() {
        this.jsonStr = jsonData
        this.jsonModal = true
      },
      importJson() {
        try {
          this.fields = JSON.parse(this.jsonStr)
        } catch (e) {
          this.$message({ type: 'danger', content: '输入格式不合法' })
        }
      }
    } 
  }
</script>
```
:::

### 结合bin-ui from实现校验功能

注意，编辑器初始化时需要计算编号等宽度，如默认是隐藏状态，可以用v-if来开启重绘，以免出现样式错位

::: demo
```html
<template>
<div>
  <b-form :model="template" ref="form" :rules="ruleValidate" :label-width="130">
    <b-form-item label="脚本" prop="tempSource">
      <b-code-editor v-model="template.tempSource"/>
    </b-form-item>
    <b-form-item >
      <b-button type="primary" @click="handleSubmit">提交</b-button>
    </b-form-item>
  </b-form>
</div>
</template>
<script>
  const jsonData = `{"title":"测试json数据","children":[{"name":"子项名称", "desc":"子项说明" },{"name":"子项名称1", "desc":"子项说明1" }]}`

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
    methods:{
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

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value    | 绑定数据，可用v-model   | String  |  —   |   0  |
| show-number   | 显示行号   | Boolean  |  —   |   true  |
| mode   | 模式   | String  |  'application/json','text/javascript'   |   'application/json'  |
| theme   | 提供若干个默认比较好看的皮肤   | String  | 可选值参考其他配置项中列出  |   idea  |
| lint   | 是否进行lint检查   | Boolean  | 暂时只支持json  |   true  |
| readonly   | 只读模式   | Boolean  | -  |   false  |
| auto-format | 是否自动格式化   | Boolean  | -  |   true  |
| indent-unit | 缩进字符   | Number  | -  |   2  |
| smart-indent | 是否自动缩进   | Boolean  | -  |  true  |
| line-wrap | 代码换行   | Boolean  | -  |   true  |
| gutter | 代码折叠   | Boolean  | -  |   true  |
| height    | 默认编辑器高度  | String  |  —   |   300px  |

### Events

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| on-change    | 输入项改变事件   | value  |
| formatCode   | 手动触发格式化方法   | -  |
| refresh   | 手动刷新方法   | -  |
| getValue   | 自行获取值   | -  |
