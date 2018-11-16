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
    let has = false
    this.list.forEach((d, k) => {
      let testResult = testStr(keyWord, d.v)
      let className = ''
      if (testResult) {
        has = true
      } else {
        className = $style.hide
      }

      eLis.push(<li key={k} class={className} domPropsInnerHTML={testResult} data-index={k}></li>)
    })
    return (
      <div class={$style.box}>
        <input type="text" onKeyup={this.onkeyup} onFocus={this.onfocus} onBlur={this.onblur}/>
        <ul class={$style.list} v-show={this.listShow && has} onMousedown={this.onmousedown}>{eLis}</ul>
      </div>
    )
  },
  data () {
    return {
      keyWord: '',
      list: [
        {
          v: 'a'
        },
        {
          v: 'ab'
        },
        {
          v: 'abc'
        },
        {
          v: 'bcde'
        }
      ],
      listShow: false
    }
  },
  methods: {
    onkeyup ({ target }) {
      this.keyWord = target.value
      console.log(this.keyWord)
    },
    onfocus () {
      this.listShow = true
    },
    onblur () {
      this.listShow = false
    },
    onmousedown (e) {
      e.preventDefault()
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
  },
  directives: {
    'blur-close': {
      inserted: function (el) {
        el.tabIndex = -1
      }
    }
  }
}
</script>

<style module>
.hide {
  display: none;
}

.box {
  position: relative;
}

.list {
  list-style-type: none;
  margin: 10px 0 0 0;
  padding: 0;

      position: absolute;
    /* width: 95%; */
    width: 200px;
    background-color: #fff;
    border-radius: 5px;
    color: #666;
    /* left: 50%; */
    /* transform: translateX(-50%); */
    box-shadow: 0 0 3px 3px #ccc;
    border: 1px solid #67a2ee;
    max-height: 250px;
    overflow: auto;
}
.list li {
  font-size: 16px;
    line-height: 22px;
    padding: 6px 0 6px 5px;
    box-sizing: border-box;
    -webkit-appearance: none;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 400;
    color: #878787;
}
.list li:hover {
  background-color: #67a2ee;
  color: #fff;
}
</style>
