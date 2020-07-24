import config from '../../../package.json'
// 功能插件
import log from '../../utils/log'

let baseUrl = 'https://wangbin3162.gitee.io'
export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示 https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false

    // 打印UI官网
    log.pretty(`[${config.name}] ${config.version}`, `${baseUrl}/${config.name}`, '#ee0067')
  }
}
