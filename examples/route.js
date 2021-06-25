import { createRouter, createWebHashHistory } from 'vue-router'
import { nextTick } from 'vue'
import { LoadingBar } from 'bin-ui-next'
import hljs from 'highlight.js'

const navConfig = require('./nav.config.json')

let routes = [
  {
    path: '',
    redirect: 'guide',
    name: 'index',
  },
]

Object.keys(navConfig).forEach((header) => {
  routes = routes.concat(navConfig[header])
})

const addComponent = router => {
  router.forEach((route) => {
    if (route.items) {
      addComponent(route.items)
      routes = routes.concat(route.items)
    } else {
      if (!route.name) return
      route.meta = { desc: route.desc }
      route.component = () => import(/* webpackChunkName: "DOCS" */ `./docs/${route.name}.md`)
    }
  })
}
addComponent(routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})
router.afterEach(async () => {
  await nextTick()
  const blocks = document.querySelectorAll('pre code:not(.hljs)')
  Array.prototype.forEach.call(blocks, hljs.highlightElement)
  LoadingBar.done()
})

export default router
