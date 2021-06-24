import Editor from './components/editor'
import log from './utils/log'

const components = [Editor]

import config from '../package.json'

const version = config.version // version_ to fix tsc issue

const install = function (app, options = {}) {
  components.forEach(component => {
    app.use(component)
  })

  if (!options.disabledDoc) {
    log.pretty(`[${config.name}] ${config.version}`, config.homepage)
  }
  return app
}

export { Editor }

export default { version, install }
