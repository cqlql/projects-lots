
/* eslint-env jest, mocha */
/* eslint-disable no-unused-expressions */
import autoprefix from './index'
import minusHump from './minus-hump'
describe('autoPrefix', function () {
  it('autoPrefix 一般使用', function () {
    expect(autoprefix('width')).to.be.equal('width')
    expect(autoprefix('appearance')).to.be.equal('webkitAppearance')
    expect(autoprefix('appearance', 'js')).to.be.equal('webkitAppearance')
    expect(autoprefix('appearance', 'css')).to.be.equal('-webkit-appearance')
  })
  it('autoPrefix 不存在的属性', function () {
    expect(autoprefix('abc-xxx')).to.be.equal(undefined)
  })
  it('autoPrefix 带前缀 css 名称', function () {
    let err = false
    try {
      autoprefix('-webkit-appearance')
    } catch (e) {
      err = true
    }
    expect(err).to.be.equal(true)
  })
  it('minusHump 减号转驼峰', function () {
    // 首字母大写
    expect(minusHump('-webkit-appearance')).to.be.equal('WebkitAppearance')
    // 首字母小写
    expect(minusHump('min-height')).to.be.equal('minHeight')

    // 直接处理，首字母大写
    const capital = minusHump('min-width').replace(/^\w/, w => w.toUpperCase())
    expect(capital).to.be.equal('MinWidth')
  })
})
