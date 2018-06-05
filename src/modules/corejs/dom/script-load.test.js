
/* eslint-env jest, mocha */
/* eslint-disable no-unused-expressions */
import scriptLoad from './script-load'
const jqCdn = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/jquery/jquery-1.10.2.min_65682a2.js'
describe('script-load', function () {
  it('加载成功测试', function (done) {
    // this.timeout(5000)// 设置超时时间为5s
    scriptLoad(jqCdn).then(() => {
      expect(window.$).to.be.not.equal(undefined)
    }).catch(e => {
      console.log(e)
    }).then(done)
  })
  it('加载失败测试', function (done) {
    scriptLoad('https://err.xx').catch(e => {
      // console.log(e)
      done()
    })
  })
})
