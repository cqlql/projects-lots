
function keywordHandle (keyword) {
  return keyword.replace(/(\\|\.|\?|\(|\)|\^|\$|\*|\+|\?|{|}|=|!|\||\[|])/g, '\\$1')
    .replace(/ +/g, ' ')
    .replace(/ /g, '[^]*?')
}

export function keywordTest (keyword, target) {
  let satisfy
  let keywordResult = keyword ? keywordHandle(keyword) : ''
  satisfy = (new RegExp(keywordResult)).test(target)
  return satisfy
}

export function keywordTestObj (keyword, obj, names) {
  let satisfy = false
  let keywordResult = keyword ? keywordHandle(keyword) : ''
  names.some(function (name) {
    return (satisfy = (new RegExp(keywordResult)).test(obj[name]))
  })
  return satisfy
}
