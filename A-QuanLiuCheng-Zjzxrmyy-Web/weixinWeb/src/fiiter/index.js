// 过滤姓名
function hideMiddle (value) {
  if (value) {
    let len = ''
    for (let i = 0; i < value.length - 1; i++) {
      len = len + '*'
    }
    return value.substring(0, 1) + len
  }
  return value
}
export {hideMiddle}
