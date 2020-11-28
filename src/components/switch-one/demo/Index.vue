<template>
  <div>
    <div class="box">
      <SwitchOne :switch-state="switchState" :switch-type="switchType" @loadData="loadData">
        <template v-slot:default="props">
          <p>页数：{{ props.data.page }}</p>
          <span>{{ props.data.cont }}</span>
        </template>
      </SwitchOne>
    </div>
    <button @click="prev">上一页</button>
    <button @click="next">下一页</button>
  </div>
</template>

<script>
import SwitchOne from '@/components/switch-one/Index.vue'
export default {
  components: {
    SwitchOne
  },
  data () {
    return {
      switchState: true,
      switchType: 'left',
      index: 0,
      item: { cont: '' },
      list: [
        { page: 1, cont: '秋天的后半夜，月亮下去了，太阳还没有出，只剩下一片乌蓝的天；除了夜游的东西，什么都睡着。华老栓忽然坐起身。擦着火柴，点上遍身油腻的灯盏，茶馆的两间屋子里，便弥满了青白的光。' },
        { page: 2, cont: '“小栓的爹，你就去么？”是一个老女人的声音。里边的小屋子里，也发出一阵咳嗽。' },
        { page: 3, cont: '“唔。”老栓一面听，一面应，一面扣上衣服；伸手过去说，“你给我罢。”' }
      ]
    }
  },
  methods: {
    next () {
      let index = this.index + 1
      if (index > 2) index = 0
      this.index = index
      this.switchState = !this.switchState
      this.switchType = 'left'
    },
    prev () {
      let index = this.index - 1
      if (index < 0) index = 2
      this.index = index
      this.switchState = !this.switchState
      this.switchType = 'right'
    },
    loadData (success) {
      // setTimeout(() => {
      this.item = this.list[this.index]
      success(this.item)
      // }, 1000)
    }
  }
}
</script>

<style scoped>
.box{
  border: 2px solid #000;

  width: 200px;
  height: 300px;
}
</style>
