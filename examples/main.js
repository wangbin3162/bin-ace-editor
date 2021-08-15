import '@babel/polyfill'
import { createApp } from 'vue'
import router from './route'
import App from './App.vue'
import BinUI from 'bin-ui-next'
import 'bin-ui-next/lib/styles/normalize.css'
import 'bin-ui-next/lib/styles/index.css'
import './assets/styles/index.styl'

import DemoBlock from './components/demo-block.vue'
import MainFooter from './components/footer.vue'
import MainHeader from './components/header.vue'
import SideNav from './components/side-nav.vue'
// 自定义组件库内容

// 当前组件的引入
import Editor from '../src/components/editor'

import * as ace from 'brace'
import 'brace/ext/emmet'
import 'brace/ext/language_tools'
import 'brace/mode/json'
import 'brace/snippets/json'
import 'brace/mode/javascript'
import 'brace/snippets/javascript'
import 'brace/mode/markdown'
import 'brace/snippets/markdown'
import 'brace/mode/sql'
import 'brace/snippets/sql'
import 'brace/mode/java'
import 'brace/snippets/java'
import 'brace/mode/elixir'
import 'brace/snippets/elixir'
import 'brace/mode/html'
import 'brace/snippets/html'
import 'brace/mode/css'
import 'brace/snippets/css'
import 'brace/mode/stylus'
import 'brace/snippets/stylus'
import 'brace/theme/chrome'
import 'brace/theme/xcode'
import 'brace/theme/clouds'
import 'brace/theme/crimson_editor'
import 'brace/theme/sqlserver'
import 'brace/theme/github'
import 'brace/theme/textmate'
import 'brace/theme/tomorrow'
import 'brace/theme/solarized_light'
import 'brace/theme/cobalt'
import 'brace/theme/dracula'
import 'brace/theme/monokai'
import 'brace/theme/solarized_dark'
import 'brace/theme/terminal'
import 'brace/theme/vibrant_ink'

const app = createApp(App)
app.use(BinUI, { disabledDoc: true })
app.config.productionTip = false

app.component('DemoBlock', DemoBlock)
app.component('MainHeader', MainHeader)
app.component('MainFooter', MainFooter)
app.component('SideNav', SideNav)

// 注册组件后即可使用
app.component(Editor.name, Editor)
app.use(router)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
