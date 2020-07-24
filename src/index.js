// 核心插件
import corePlugin from './plugin/core'
// 组件
import Editor from './components/editor'

const components = [
  Editor
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(corePlugin)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install, Editor
}
