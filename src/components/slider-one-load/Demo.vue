<template>
  <div>
    <SliderOneLoad ref="vSliderOneLoad" @load="onLoad" @setBlank="onSetBlank" :total="5">
      <div v-for="(item, i) of items" class="item" :key="i" :slot="i" v-show="item.blank===false">
        <p>page：{{item.page}}</p>
        {{item.content}}
        <!-- <p>是否空白：{{item.blank}}</p> -->
      </div>
    </SliderOneLoad>
    <p>
      <label>是否带动画：<input type="checkbox" v-model="hasAnimate">{{hasAnimate?'有动画':'没动画'}}</label>
    </p>
    <p><label>手动跳页<input type="number" v-model="page"></label></p>
    <button @click="$refs.vSliderOneLoad.goPage(0, true)">直接加载第1页</button>
    <button @click="$refs.vSliderOneLoad.goPage(1, true)">直接加载第2页</button>
  </div>
</template>

<script>
import SliderOneLoad from './index'
export default {
  data () {
    return {
      page: 0,
      hasAnimate: true,
      items: [{
        blank: true
      }, {
        blank: true
      }, {
        blank: true
      }],
      count: 0
    }
  },
  components: {
    SliderOneLoad
  },
  mounted () {
    // 直接加载第一页
    this.$refs.vSliderOneLoad.goPage(0, true)
  },
  methods: {
    onLoad (itemData) {
      let {showIndex, page, beforePage, inited} = itemData

      console.log(`此项之前显示的页面：${beforePage}\n当前页面：${page}\n是否已初始化过：${inited}\n`, itemData)

      // 此判断实现：之前加载过的不加载
      if (beforePage === page && inited) return

      // 绑定数据
      let item = {
        page,
        blank: false,
        content: ++this.count + '故事发生在偏僻贫瘠的山村之中。张保民（宋洋 饰）是一名矿工，一天，他被妻子翠霞（谭卓 饰）叫回了家，原来，他们的儿子失踪了。带着儿子的照片，不会说话的张保民踏上了寻子之路，途中，他遇见了大资本家昌万年（姜武 饰）的爪牙，两方人马起了冲突，昌万年骗张保民自己知道他儿子的下落，实际上，他隐藏了一个黑暗的秘密。'
      }
      this.$set(this.items, showIndex, item)
    },
    onSetBlank (index, blank) {
      this.items[index].blank = blank
    }
  },
  watch: {
    page (page) {
      this.$refs.vSliderOneLoad.goPage(page || 0, this.hasAnimate === false)
    }
  }
}
</script>

<style scoped>
.item {
  /* outline: 2px solid red; */
  /* box-shadow: 2px solid #ddd; */
}
</style>
