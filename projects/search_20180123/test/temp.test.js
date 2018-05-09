import {keywordTestObj} from '../src/modules/search/keyword-test'

describe('search', function () {
  it('keyword-test 模块', function () {
    let d = {
      title: '大标题',
      name: '名称',
      children: {
        content: '子内容'
      }
    }

    expect(keywordTestObj('大', d, ['title', 'name'])).to.be.true
    expect(keywordTestObj('题', d, ['title', 'name'])).to.be.true
    expect(keywordTestObj('大 题', d, ['title', 'name'])).to.be.true
    expect(keywordTestObj('大题', d, ['title', 'name'])).to.be.false
    expect(keywordTestObj('名', d, ['title', 'name'])).to.be.true
    expect(keywordTestObj('内容', d.children, ['title', 'content'])).to.be.true
    expect(keywordTestObj('', d.children, ['title', 'content'])).to.be.true
    expect(keywordTestObj('2', d.children, ['title', 'content'])).to.be.false
  })
})
