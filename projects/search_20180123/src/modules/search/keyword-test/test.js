import {keywordTestObj} from './keyword-test'

let d = {
  title: '大标题',
  name: '名称',
  children: {
    content: '子内容'
  }
}

console.log(keywordTestObj('大', d, ['title', 'name'])) // true
console.log(keywordTestObj('题', d, ['title', 'name'])) // true
console.log(keywordTestObj('大 题', d, ['title', 'name'])) // true
console.log(keywordTestObj('大题', d, ['title', 'name'])) // false
console.log(keywordTestObj('名', d, ['title', 'name'])) // true
console.log(keywordTestObj('内容', d.children, ['content'])) // true
console.log(keywordTestObj('', d.children, ['content'])) // true
console.log(keywordTestObj('2', d.children, ['content'])) // false
