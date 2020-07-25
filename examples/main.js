import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/color-brewer.css'
import './assets/styles/index.styl'
import BinUI from 'bin-ui'
import 'bin-ui/lib/styles/index.css'

// 文档组件引入
import DemoBlock from './components/demo-block.vue'
import MainHeader from './components/header.vue'
import MainFooter from './components/footer.vue'
import SideNav from './components/side-nav.vue'

// 当前组件的引入
import Editor from '../src/components/editor'
import '../src/styles/index.styl'


require('brace/ext/emmet')
require('brace/ext/language_tools') // language extension
let language = ['json', 'javascript', 'markdown', 'sql', 'java', 'elixir', 'html', 'css', 'stylus']

let theme = [
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
]

language.forEach(lang => {
  require('brace/mode/' + lang)
  require('brace/snippets/' + lang)
})

theme.forEach(item => {
  require('brace/theme/' + item)
})

Vue.use(BinUI)

Vue.component('DemoBlock', DemoBlock)
Vue.component('MainHeader', MainHeader)
Vue.component('MainFooter', MainFooter)
Vue.component('SideNav', SideNav)

// 注册组件后即可使用
Vue.component(Editor.name, Editor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
