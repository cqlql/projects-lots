/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import dictCreate from '@/utils/corejs/dict-data/dict-create.js'

describe('dict-data-数据字典创建', function () {
  it('基础调用', function () {
    const newList = dictCreate(
      [{
        k1: 'v1',
        k2: 'v2'
      },
      {
        k1: 'v11',
        k2: 'v22'
      }],
      'k1'
    )
    expect(newList.v11[0].k2).toBe('v22')
  })
})
