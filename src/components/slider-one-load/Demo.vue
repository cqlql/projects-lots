<template>
  <div>
    <SliderOneLoad ref="vSliderOneLoad" @toLoad="toLoad" :total="5">
      <div v-for="(item, i) of items" class="item" :key="i" :slot="i">{{item.content}}</div>
    </SliderOneLoad>
    <p>
      <label>是否带动画：<input type="checkbox" v-model="hasAnimate">{{hasAnimate?'有动画':'没动画'}}</label>
    </p>
    <p><label>手动跳页<input type="number" v-model="page"></label></p>
    <button @click="$refs.vSliderOneLoad.goPage(0, true)">加载第一页</button>
  </div>
</template>

<script>
import SliderOneLoad from './Index'
export default {
  data () {
    return {
      page: 0,
      hasAnimate: true,
      items: [{}, {}, {}],
      count: 0
    }
  },
  components: {
    SliderOneLoad
  },
  methods: {
    toLoad (itemData) {
      let {showIndex, blank, page} = itemData
      if (blank === false) return // 非空白页不加载
      console.log('触发了加载', 'page:' + page, itemData)
      let item = {
        content: ++this.count
      }
      this.$set(this.items, showIndex, item)
    }
  },
  watch: {
    page (page) {
      this.$refs.vSliderOneLoad.goPage(page || 0, this.hasAnimate === false)
    }
  }
}
</script>
