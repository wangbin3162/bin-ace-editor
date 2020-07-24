import navConf from '../nav.config.json'

let routes = [
  {
    path: '/',
    redirect: 'guide',
    name: 'index'
  }
]

Object.keys(navConf).forEach((header) => {
  routes = routes.concat(navConf[header])
})

let addComponent = (router) => {
  router.forEach((route) => {
    if (route.items) {
      addComponent(route.items)
      routes = routes.concat(route.items)
    } else {
      if (!route.name) return
      route.meta = { desc: route.desc }
      route.component = r => require.ensure([], () =>
        r(require(`../docs/${route.name}.md`)))
    }
  })
}
addComponent(routes)
export default routes
