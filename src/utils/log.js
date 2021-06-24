const log = {}

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
export function typeColor(type = 'default') {
  let color = ''
  switch (type) {
    case 'primary':
      color = '#0d85ff'
      break
    case 'success':
      color = '#52c41a'
      break
    case 'warning':
      color = '#fea638'
      break
    case 'danger':
      color = '#ff4d4f'
      break
    case 'default':
      color = '#35495E'
      break
    default:
      color = type
      break
  }
  return color
}

// 漂亮的
log.pretty = function (title, text, type = 'primary') {
  console.log(
    `%c ${title} %c ${text} %c`,
    `background:${typeColor(type)};border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
    `border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 0 2px 2px 0; color: ${typeColor(type)};`,
    'background:transparent'
  )
}

export default log
