import Editor from './components/editor'
import log from './utils/log'

import config from '../package.json'

const version = config.version // version_ to fix tsc issue

const install = function (app, options = {}) {

  app.component(Editor.name, Editor)

  if (!options.disabledDoc) {
    log.pretty(`[${config.name}] ${config.version}`, config.homepage)
  }
  return app
}

export { Editor }

export default { version, install }
