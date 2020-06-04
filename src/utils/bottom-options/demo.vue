<template>
  <div id="app">
    <p><a @click="onClickShow">显示</a></p>
    <BottomOptions @select="onSelect" :show.sync="bottomOptionsShow">
      <ul>
        <li data-type="5">图片</li>
      </ul>
      <ul>
        <li data-type="1">删除1</li>
        <li data-type="2">删除2</li>
        <li data-type="3">删除3</li>
        <li data-type="4">删除4</li>
      </ul>
    </BottomOptions>
  </div>
</template>

<script>
  import BottomOptions from '@/modules/bottom-options/BottomOptions.vue'
  export default {
    data () {
      return {
        bottomOptionsShow: 1
      }
    },
    components: {
      BottomOptions
    },
    methods: {
      onClickShow () {
        this.bottomOptionsShow = 1
      },
      onSelect (el) {
        switch (el.dataset.type) {
          case '1':
            console.log(1)
            break
          case '2':
            console.log(2)
            break
          case '3':
            console.log(3)
            break
          case '4':
            console.log(4)
            break
          case '5':
            console.log(5)
            break
        }
        console.log(el)
      }
    }
  }
</script>

<style scoped>
p{
  text-align: center;
  font-size: 20px;
  padding: 10px;
}
</style>
