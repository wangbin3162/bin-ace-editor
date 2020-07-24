## Options

<template>
    <div class="global-anchor">
      <b-anchor :scroll-offset="100">
        <b-anchor-link href="#editor-xuan-xiang" title="editor选项"></b-anchor-link>
        <b-anchor-link href="#renderer-xuan-xiang" title="renderer选项"></b-anchor-link>
        <b-anchor-link href="#mousehandler-xuan-xiang" title="mouseHandler选项"></b-anchor-link>
        <b-anchor-link href="#session-xuan-xiang" title="session选项"></b-anchor-link>
        <b-anchor-link href="#kuo-zhan-xuan-xiang" title="扩展选项"></b-anchor-link>
      </b-anchor>
    </div>
</template>

ace-editor 配置项列表说明

### editor选项

| 选项明     | 类型      | 默认值    |   可选值    |  备注   |
|---------- |---------- |-------------  |-------- |-------- |
| selectionStyle|	String	|text|	line、text|	选中样式 |
| highlightActiveLine| 	Boolean| 	true| 	-	| 高亮当前行| 
| highlightSelectedWord	| Boolean| 	true| 	-	| 高亮选中文本| 
| readOnly| 	Boolean| 	false| 	-	| 是否只读| 
| cursorStyle| 	String| 	ace	| ace、slim、smooth、wide| 	光标样式| 
| mergeUndoDeltas| 		String、Boolean| 	false| 	always	| 合并撤销| 
| behavioursEnabled| 	Boolean| 	true| 	-	| 启用行为| 
| wrapBehavioursEnabled| 	Boolean	| true| 	-| 	启用换行| 
| autoScrollEditorIntoView| 	Boolean| 	false| 	-	| 启用滚动| 
| copyWithEmptySelection| 	Boolean	| true| 	-| 	复制空格| 
| useSoftTabs| 	Boolean	| false| 	-	| 使用软标签| 
| navigateWithinSoftTabs| 	Boolean| 	false| 	-	| 软标签跳转| 
| enableMultiselect| 	Boolean| 	false| 	-	| 选中多处| 

### renderer选项

| 选项明     | 类型      | 默认值    |   可选值    |  备注   |
|---------- |---------- |-------------  |-------- |-------- |
| hScrollBarAlwaysVisible| 	Boolean	| false	| -	| 纵向滚动条始终可见| 
| vScrollBarAlwaysVisible| 	Boolean| 	false| 	-	| 横向滚动条始终可见| 
| highlightGutterLine| 	Boolean| 	true| 	-	| 高亮边线| 
| animatedScroll	| Boolean| 	false	| -	| 滚动动画| 
| showInvisibles| 	Boolean	| false| 	- | 	显示不可见字符| 
| showPrintMargin| 	Boolean| 	true| 	- | 	显示打印边距| 
| printMarginColumn| 	Number| 	80	| -	| 设置页边距| 
| printMargin| 	Boolean、Number| 	false| 	-	| 显示并设置页边距| 
| fadeFoldWidgets| 	Boolean| 	false| 	-	| 淡入折叠部件| 
| showFoldWidgets| 	Boolean	| true	| -	| 显示折叠部件| 
| showLineNumbers	| Boolean| 	true| 	-| 	显示行号| 
| showGutter| 	Boolean	| true	| -	| 显示行号区域| 
| displayIndentGuides| 	Boolean| 	true| 	-| 	显示参考线| 
| fontSize	| Number、String| 	inherit	| -	| 设置字号| 
| fontFamily| 	String	| inherit	|  -	|	设置字体| 
| maxLines| 	Number	| -	| -	| 至多行数| 
| minLines| 	Number	| -	| -	| 至少行数| 
| scrollPastEnd	| Boolean、Number	| 0	| -	| 滚动位置| 
| fixedWidthGutter| 	Boolean| 	false| 	-	| 固定行号区域宽度| 
| theme| 	String	| -| 	-| 	主题引用路径，例如"ace/theme/textmate"| 

### mouseHandler选项

| 选项明     | 类型      | 默认值    |   可选值    |  备注   |
|---------- |---------- |-------------  |-------- |-------- |
| scrollSpeed| 	Number| 	-| 	-	| 滚动速度| 
| dragDelay| 	Number	| -	| -	| 拖拽延时| 
| dragEnabled	| Boolean| 	true| 	-	| 是否启用拖动| 
| focusTimout| 	Number| 	-| 	-	| 聚焦超时| 
| tooltipFollowsMouse| 	Boolean	| false	| -	| 鼠标提示| 

### session选项

| 选项明     | 类型      | 默认值    |   可选值    |  备注   |
|---------- |---------- |-------------  |-------- |-------- |
| firstLineNumber| 	Number	| 1	| -| 	起始行号| 
| overwrite| 	Boolean	| -	| -	| 重做| 
| newLineMode| 	String| 	auto| 	auto/unix/windows	| 新开行模式| 
| useWorker	| Boolean| 	-| 	-	| 使用辅助对象| 
| useSoftTabs| 	Boolean	| -| 	-	| 使用软标签| 
| tabSize| 	Number| 	-	| -	| 标签大小| 
| wrap| 	Boolean| 	-| 	-	| 换行| 
| foldStyle	| String| 	-	| markbegin/markbeginend/manual	| 折叠样式| 
| mode| 	String| 	-	| -| 	代码匹配模式，例如“ace/mode/text"|

### 扩展选项

| 选项明     | 类型      | 默认值    |   可选值    |  备注   |
|---------- |---------- |-------------  |-------- |-------- | 
| enableBasicAutocompletion	| Boolean| 	-	| -	| 启用基本自动完成| 
| enableLiveAutocompletion| 	Boolean| 	-	| -	| 启用实时自动完成| 
| enableSnippets| 	Boolean	| -	| -	| 启用代码段| 
| enableEmmet| 	Boolean	| -	| -	| 启用Emmet| 
| useElasticTabstops	| Boolean| 	-	| -	| 使用弹性制表位| 
