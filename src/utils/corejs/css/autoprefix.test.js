
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import autoprefix from './autoprefix'
// import minusHump from './minus-hump'
describe('autoPrefix', function () {
  it('autoPrefix 一般使用', function () {
    expect(autoprefix('width')).toBe('width')
    expect(autoprefix('background-color')).toBe('backgroundColor')
    expect(autoprefix('borderAfter')).toBe('webkitBorderAfter')
    expect(autoprefix('borderAfter', 'js')).toBe('webkitBorderAfter')
    expect(autoprefix('borderAfter', 'css')).toBe('-webkit-borderAfter')
    autoprefix('background-color')
  })
  it('autoPrefix 不存在的属性', function () {
    expect(autoprefix('abc-xxx')).toBe(undefined)
  })
  it('autoPrefix 带前缀 css 名称', function () {
    let err = false
    try {
      autoprefix('-webkit-appearance')
    } catch (e) {
      err = true
    }
    expect(err).toBe(true)
  })
  // it('minusHump 减号转驼峰', function () {
  //   // 首字母大写
  //   expect(minusHump('-webkit-appearance')).toBe('WebkitAppearance')
  //   // 首字母小写
  //   expect(minusHump('min-height')).toBe('minHeight')

  //   // 直接处理，首字母大写
  //   const capital = minusHump('min-width').replace(/^\w/, w => w.toUpperCase())
  //   expect(capital).toBe('MinWidth')
  // })
})
