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
import SliderOneLoad from './Index'
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
        content: ++this.count
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
