<template>
  <div>
    <SliderOneLoad ref="vSliderOneLoad" @toLoad="toLoad">
      <div v-for="(item, i) of items" class="item" :key="i" :slot="i" :total="5">{{item.content}}</div>
    </SliderOneLoad>
  </div>
</template>

<script>
import SliderOneLoad from './Index'
export default {
  data () {
    return {
      items: [{}, {}, {}]
    }
  },
  components: {
    SliderOneLoad
  },
  methods: {
    toLoad ({showIndex, blank}) {
      if (blank === false) return // 非空白页不加载
      let item = {
        content: Math.random()
      }
      this.$set(this.items, showIndex, item)
    }
  }
}
</script>
