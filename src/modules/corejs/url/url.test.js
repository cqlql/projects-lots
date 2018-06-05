/* eslint-env jest, mocha */
/* eslint-disable no-unused-expressions */
import getUrlSearch from './get-url-search'
describe('url', function () {
  it('getUrlSearch', function () {
    let v1 = getUrlSearch('name', '?name=123')
    let v2 = getUrlSearch('name2', '?name=123')
    expect(v1).to.equal('123')
    expect(v2).to.be.null
  })
})
