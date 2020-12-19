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
import scopeElements from '@/libs/corejs/dom/scope-elements.js'
import Highlight from './highlight.js'
export default {
  data () {
    return {
      selectedIndex: -1,
      // firstIndex: -1,
      highlightedIndex: 0,
      // selectedValue: '',
      keyWord: '',
      valueKeyName: 'value',
      list: [],
      listShow: false,
      isShow: true,
      showList: [],
      placeholder: '',
      noFound: true
    }
  },
  computed: {
    selectedItem () {
      return this.list[this.selectedIndex]
    },
    highlight () {
      return new Highlight({
        el: this.$refs.eList,
        highlightedIndex: this.highlightedIndex
      })
    }
  },
  watch: {
    selectedIndex (i) {
      this.$emit('dataChange', this.selectedItem)
    },
    listShow (isShow) {
      this.onListShowChange(isShow)
      if (!isShow) {
        this.highlightedIndex = 0
      }
    },
    highlightedIndex (i) {
      this.highlight.highlightedIndex = i
    }
  },
  mounted () {

  },
  methods: {
    onkeydown (e) {
      if (this.noFound) return
      let { keyCode } = e
      if (keyCode === 38) {
        this.highlightedIndex = this.highlight.highlightPrev()
        e.preventDefault()
      } else if (keyCode === 40) {
        this.highlightedIndex = this.highlight.highlightNext()
        e.preventDefault()
      }
    },
    onkeyup ({ target, keyCode }) {
      if (keyCode === 38 || keyCode === 40) {
        return
      }
      if (keyCode === 13) {
        if (this.noFound) return
        this.select(this.$refs.eList.children[this.highlightedIndex].getAttribute('data-index'))
        this.listShow = false
        return
      }
      this.listShow = true
      this.keyWord = target.value
    },
    onfocus () {
      this.keyWord = ''
      this.listShow = true
    },
    onblur () {
      this.listShow = false
      // let { selectedIndex, firstIndex, valueKeyName } = this
      let { selectedIndex, valueKeyName } = this
      let v
      if (selectedIndex > -1) {
        v = this.list[selectedIndex][valueKeyName]
      // } else if (firstIndex > -1) {
      //   v = this.list[firstIndex][valueKeyName]
      } else {
        v = ''
      }
      this.keyWord = this.$refs.ipt.value = v
    },
    onmousedown (e) {
      e.preventDefault()
    },
    onselect ({ target }) {
      scopeElements(target, elem => {
        if (elem.tagName === 'LI') {
          this.select(elem.getAttribute('data-index'))
          this.listShow = false
          return false
        }
      })
    },
    testStr (k, str) {
      if (k.trim() === '') return str
      // 多个连续空格替换成 |
      k = k.replace(/\s+/g, '|')

      const reg = new RegExp(`(${k})`, 'gi')

      // let pass = false
      // while (result = reg.exec(str)) {
      //   pass = true
      // }

      let result = str.replace(reg, '<b>$1</b>')
      return result === str ? false : result
    },
    select (index) {
      let item = this.list[index]
      if (item) {
        let v = item[this.valueKeyName]
        this.selectedIndex = index * 1
        this.keyWord = this.$refs.ipt.value = v
      }
    },
    // 重置
    reset () {
      // this.firstIndex = -1
      this.selectedIndex = -1
      this.keyWord = this.$refs.ipt.value = ''
    },
    onListShowChange (isShow) { }
  },
  render () {
    const { $style, testStr, keyWord, valueKeyName, selectedIndex, highlightedIndex } = this
    const eLis = []
    let i = 0
    this.list.forEach((d, k) => {
      let testResult = testStr(keyWord, d[valueKeyName])
      let className = ''
      if (testResult) {
        if (selectedIndex === k) {
          className = $style.selected
        }
        if (highlightedIndex === i) {
          className += ' ' + $style.highlighted
        }
        let hIndex = i
        eLis.push(
          <li
            key={k}
            class={className} domPropsInnerHTML={testResult} data-index={k}
            onMouseenter={e => { this.highlightedIndex = hIndex }}
          />
        )
        i++
      }
    })
    let noFound = this.noFound = !i
    if (noFound) {
      eLis.push(<li key={-1}><i>没有找到</i></li>)
    }
    return (
      <div class={$style.box} v-show={this.isShow}>
        <input placeholder={this.placeholder} ref="ipt" type="text" onKeydown={this.onkeydown} onKeyup={this.onkeyup} onFocus={this.onfocus} onBlur={this.onblur} onClick={() => { this.keyWord = ''; this.listShow = true }} />
        <ul ref="eList" class={$style.list} v-show={this.listShow} onMousedown={this.onmousedown} onClick={this.onselect}>{eLis}</ul>
      </div>
    )
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
  /* margin: 10px 0 0 0; */
  padding: 0;

  position: absolute;
  z-index: 1;
  /* width: 95%; */
  /* width: 200px; */
  background-color: #fff;
  border-radius: 3px;
  color: #666;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  /* box-shadow: 0 0 3px 3px #ccc; */
  border: 1px solid #329efc;
  max-height: 250px;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;

  /*** webkit ***/
  /*滚动条整体*/
  &::-webkit-scrollbar {
    /* border-radius: 5px; */
    width: 14px; /*滚动条宽度*/
  }
  /*滚动条按钮*/
  /* ::-webkit-scrollbar-button {

} */
  /* 滑道 */
  &::-webkit-scrollbar-track {
    /* border-radius: 5px; */
    background-color: #f3f3f3;
  }
  /* ::-webkit-scrollbar-track-piece{
  background-color:#F3F3F3;
} */

  /*横竖滚动条交角*/
  /* ::-webkit-scrollbar-corner {
  background-color: #F3F3F3;
} */
  /*横竖滚动条交角图案*/
  /* ::-webkit-resizer {
  background-repeat: no-repeat;
  background-position: bottom right;
} */
  /*滚动条*/
  &::-webkit-scrollbar-thumb {
    /* border-radius: 5px; */
    background-color: #f3f3f3;
    border: solid 1px #c0c0c0;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #f3f3e0;
  }
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

  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
.list li.selected {
  background-color: #ddd;
  /* color: #fff;
  border-bottom-color: #67a2ee; */
}
.list li.highlighted {
  background-color: #329efc;
  color: #fff;
  border-bottom-color: #329efc;
}
.list li b {
  text-decoration: underline;
}
</style>
