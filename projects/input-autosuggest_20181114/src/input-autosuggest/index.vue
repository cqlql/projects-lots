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
    let firstIndex = -1
    this.list.forEach((d, k) => {
      let testResult = testStr(keyWord, d.v)
      let className = ''
      if (testResult) {
        has = true
        if (firstIndex === -1) {
          firstIndex = k
        }
      } else {
        className = $style.hide
      }
      // 默认选匹配的第一个，但必须有输入值
      if (keyWord) this.firstIndex = firstIndex

      eLis.push(<li key={k} class={className} domPropsInnerHTML={testResult} data-index={k}></li>)
    })
    return (
      <div class={$style.box}>
        <input ref="ipt" type="text" onKeyup={this.onkeyup} onFocus={this.onfocus} onBlur={this.onblur} onClick={() => { this.listShow = true }}/>
        <ul class={$style.list} v-show={this.listShow && has} onMousedown={this.onmousedown} onClick={this.onselect}>{eLis}</ul>
      </div>
    )
  },
  data () {
    return {
      selectedIndex: -1,
      firstIndex: -1,
      // selectedValue: '',
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
      this.listShow = true
      this.keyWord = target.value
    },
    onfocus () {
      this.listShow = true
    },
    onblur () {
      this.listShow = false
      let { selectedIndex, firstIndex } = this
      let v
      if (selectedIndex > -1) {
        v = this.list[selectedIndex].v
      } else if (firstIndex > -1) {
        v = this.list[firstIndex].v
      } else {
        v = ''
      }
      this.keyWord = this.$refs.ipt.value = v
    },
    onmousedown (e) {
      e.preventDefault()
    },
    onselect ({ target }) {
      if (target.tagName !== 'LI') return
      let index = target.dataset.index
      let v = this.list[index].v
      // this.selectedValue = v
      this.selectedIndex = index * 1
      this.listShow = false
      this.keyWord = this.$refs.ipt.value = v
    },
    testStr (k, str) {
      // 多个连续空格替换成 |
      k = k.replace(/\s+/g, '|')

      const reg = new RegExp(`(${k})`, 'gi')

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
