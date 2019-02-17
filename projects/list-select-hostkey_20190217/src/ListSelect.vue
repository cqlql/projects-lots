<template>
  <ul :class="$style.listSelect">
    <li
      v-for="(item,i,key) of list"
      :key="key"
      :class="{
        [$style.item]: true,
        [$style.highlighted]: i === highlightedIndex,
        [$style.selected]: i === selectedIndex,
      }"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      highlightedIndex: 0,
      selectedIndex: 1,
      list: [
        '天空',
        '大地',
        '宇宙',
        '万物是一个汉语词汇，读音为wàn wù，统指宇宙内外一切存在物（即物质）；狭指地球一切存在物。“万物”是数量词，万物中的万字，由于它是汉字数字较大的 数字，故有“最多”之意，不是指有一万个。需要注意的是“万物”不同于“万事”，“万物”只包含“物”不包含“事”，故而万物指的是物不是事，因此常与“万事”一词搭配使用，才有了“万事万物”这一个词。',
        1,
        2,
        3
      ]
    }
  },
  computed: {
    eItems () {
      return this.$el.children
    }
  },
  methods: {
    highlight (index) {
      let eBox = this.$el
      let eItem = this.eItems[index]

      let scrollTop = eBox.scrollTop
      let boxHeight = eBox.clientHeight
      let itemHeight = eItem.offsetHeight
      let itemTop = eItem.offsetTop

      if (itemTop < scrollTop) { // 隐藏在上部分
        eBox.scrollTop = itemTop
      } else if (itemHeight + itemTop > boxHeight + scrollTop) { // 隐藏在下部分
        eBox.scrollTop = itemTop - boxHeight + itemHeight
      }
      this.highlightedIndex = index
    },
    highlightPrev () {
      let index = this.highlightedIndex
      if (index === 0) return
      index -= 1
      this.highlight(index)
    },
    highlightNext () {
      let index = this.highlightedIndex
      if (index === this.eItems.length - 1) return
      index += 1
      this.highlight(index)
    }
  }
}
</script>

<style module>
.listSelect {
  list-style: none;
  margin: 0;
  padding: 0;

  font-size: 14px;
  border: 1px solid #aaa;
  max-height: 250px;
  overflow: auto;
  /* border-radius: 5px; */
  position: relative;
}
.item {
  padding: 6px;
  user-select: none;
  cursor: pointer;
}
.item.selected {
  background-color: #ddd;
}
.item.highlighted {
  background-color: #5897fb;
  color: white;
}
</style>
