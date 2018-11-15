
function testStr (k, str) {
  // 多个连续空格替换成 |
  k = k.replace(/\s+/g, '|')

  const reg = new RegExp(`(${k})`, 'g')

  // let pass = false
  // while (result = reg.exec(str)) {
  //   pass = true
  // }

  let result = str.replace(reg, '<b>$1</b>')
  console.log(result)
  return result === str ? false : result
}

fdescribe('input-autosuggest 输入建议匹配规则', function () {
  it('测试各种值', function () {
    let k
    let str

    // 测试 多个连续空格替换成 |
    k = 'a  b   c'
    expect(k.replace(/\s+/g, '|')).toBe('a|b|c')
    k = 'a b c'
    expect(k.replace(/\s+/g, '|')).toBe('a|b|c')
    k = 'abc'
    expect(k.replace(/\s+/g, '|')).toBe('abc')

    k = 'a'
    str = 'def'
    expect(testStr(k, str)).toBe(false)
    k = 'a b'
    str = 'abc'
    expect(Boolean(testStr(k, str))).toBe(true)
    expect(testStr(k, str)).toBe('<b>a</b><b>b</b>c')
  })

})
