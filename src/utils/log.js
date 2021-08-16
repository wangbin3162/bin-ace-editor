/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
export function typeColor(type = 'default') {
  let color = ''
  switch (type) {
    case 'primary':
      color = '#1089ff'
      break
    case 'success':
      color = '#52c41a'
      break
    case 'warning':
      color = '#fa8c16'
      break
    case 'danger':
      color = '#f5222d'
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

const print = (text, type = 'default', back = false) => {
  if (typeof text === 'object') { // 如果是对象则调用打印对象方式
    console.dir(text)
    return
  }
  if (back) { // 如果是打印带背景图的
    console.log(
      `%c ${text} `,
      `background:${typeColor(type)}; padding: 2px; border-radius: 2px;color: #fff;`,
    )
  } else {
    console.log(
      `%c ${text} `,
      `color: ${typeColor(type)};`,
    )
  }
}

const pretty = (title, text, type = 'primary') => {
  console.log(
    `%c ${title} %c ${text} %c`,
    `background:${typeColor(type)};border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
    `border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 0 2px 2px 0; color: ${typeColor(type)};`,
    'background:transparent',
  )
}

const primary = (text, back = false) => {
  print(text, 'primary', back)
}
const success = (text, back = false) => {
  print(text, 'success', back)
}
const info = (text, back = false) => {
  print(text, 'info', back)
}
const warning = (text, back = false) => {
  print(text, 'warning', back)
}
const danger = (text, back = false) => {
  print(text, 'danger', back)
}
const printVersion = (title, version, link, type = 'primary', fontSize = '20px', versionColor = '#999') => {
  console.log(
    `%c${title.toUpperCase()} %cV${version}  ${link}`,
    `color: ${typeColor(type)};font-weight: 500;font-size: ${fontSize};font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;`,
    `color: ${versionColor};`,
  )
}
const log = {
  print,
  pretty,
  primary,
  info,
  success,
  warning,
  danger,
  printVersion,
}

export default log

export const throwError = (scope, m) => {
  pretty(scope, m, 'danger')
}
export const throwWarn = (scope, m) => {
  pretty(scope, m, 'warning')
}
