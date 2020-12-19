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
export default {
  render () {
    const { $style, testStr, keyWord, valueKeyName, selectedIndex } = this
    const eLis = []
    let has = false
    let firstIndex = -1
    this.list.forEach((d, k) => {
      let testResult = testStr(keyWord, d[valueKeyName])
      let className = ''
      if (testResult) {
        has = true
        if (firstIndex === -1) {
          firstIndex = k
        }
        if (selectedIndex === k) {
          className = $style.selected
        }
      } else {
        className = $style.hide
      }
      // 默认选匹配的第一个，但必须有输入值
      if (keyWord) this.firstIndex = firstIndex

      eLis.push(<li key={k} class={className} domPropsInnerHTML={testResult} data-index={k}></li>)
    })
    return (
      <div class={$style.box} v-show={this.isShow}>
        <input placeholder={this.placeholder} ref="ipt" type="text" onKeyup={this.onkeyup} onFocus={this.onfocus} onBlur={this.onblur} onClick={() => { this.keyWord = ''; this.listShow = true }} />
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
      valueKeyName: 'value',
      list: [],
      listShow: false,
      isShow: true,
      placeholder: ''
    }
  },
  computed: {
    selectedItem () {
      return this.list[this.selectedIndex]
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
      let { selectedIndex, firstIndex, valueKeyName } = this
      let v
      if (selectedIndex > -1) {
        v = this.list[selectedIndex][valueKeyName]
      } else if (firstIndex > -1) {
        v = this.list[firstIndex][valueKeyName]
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
          this.select(elem.dataset.index)
          this.listShow = false
          return false
        }
      })
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
      this.firstIndex = this.selectedIndex = -1
      this.keyWord = this.$refs.ipt.value = ''
    }
  },
  watch: {
    selectedIndex (i) {
      this.$emit('dataChange', this.selectedItem)
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
  /* margin: 10px 0 0 0; */
  padding: 0;

  position: absolute;
  z-index: 1;
  /* width: 95%; */
  /* width: 200px; */
  background-color: #fff;
  border-radius: 5px;
  color: #666;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  box-shadow: 0 0 3px 3px #ccc;
  border: 1px solid #67a2ee;
  max-height: 250px;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;

  /*** webkit ***/
  /*滚动条整体*/
  &::-webkit-scrollbar {
    border-radius: 5px;
    width: 14px; /*滚动条宽度*/
  }
  /*滚动条按钮*/
  /* ::-webkit-scrollbar-button {

} */
  /* 滑道 */
  &::-webkit-scrollbar-track {
    border-radius: 5px;
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
    border-radius: 5px;
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
}
.list li:hover,
.list li.selected {
  background-color: #67a2ee;
  color: #fff;
  border-bottom-color: #67a2ee;
}
</style>
