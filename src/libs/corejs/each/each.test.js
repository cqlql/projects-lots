/* eslint-env jest, mocha */
/* eslint-disable no-unused-expressions */
import eachDeep from './each-deep'
describe('each测试', function () {
  describe('eachDeep 深度对象遍历', function () {
    let obj = {
      js: {
        loader: 'babel-loader',
        include: [
          '/modules/corejs'
        ]
      },
      postcss: ['vue-style-loader', {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          alias: {
            './@': '/modules/corejs'
          }
        }
      }, 'postcss-loader?sourceMap=true']
    }

    let lastValue
    eachDeep(obj, function (value, key, elem) {
      if (key === 'sourceMap') {
        elem['sourceMap'] = false
      }
      lastValue = value
    })

    it('sourceMap 是否更改为false', function () {
      let v1 = obj.postcss[1].options.sourceMap
      expect(v1).to.be.false
    })

    it('测试最后一个值', function () {
      expect(lastValue).to.be.equal('postcss-loader?sourceMap=true')
    })
  })
})
