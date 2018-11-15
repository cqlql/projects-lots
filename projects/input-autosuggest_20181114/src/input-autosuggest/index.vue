<!--
<template>
  <div>
    <input type="text" @keyup="onkeyup"/>
    <ul>
      <li v-for="(item, k) of list" :key="k" v-show="match(item)">{{item}}</li>
    </ul>
  </div>
</template>
-->

<script>
export default {
  render () {
    const { $style, testStr, keyWord } = this
    const eLis = []
    this.list.forEach((d, k) => {
      let r = testStr(keyWord, d)
      eLis.push(<li key={k} class={r ? '' : $style.hide} domPropsInnerHTML={r}></li>)
    })
    return (
      <div>
        <input type="text" onKeyup={this.onkeyup} />
        <ul>{eLis}</ul>
      </div>
    )
  },
  data () {
    return {
      keyWord: '',
      list: [
        'a',
        'ab',
        'abc',
        'def',
        'ghij'
      ]
    }
  },
  methods: {
    onkeyup ({ target }) {
      this.keyWord = target.value
      console.log(this.keyWord)
    },
    testStr (k, str) {
      // 多个连续空格替换成 |
      k = k.replace(/\s+/g, '|')

      const reg = new RegExp(`(${k})`, 'g')

      // let pass = false
      // while (result = reg.exec(str)) {
      //   pass = true
      // }

      let result = str.replace(reg, '<b>$1</b>')
      return result === str ? false : result
    }
  }
}
</script>

<style module>
.hide {
  display: none;
}
</style>
