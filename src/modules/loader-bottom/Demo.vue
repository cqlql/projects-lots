<template>
  <div>
    <button @click="reStart">模拟刷新，重新加载</button>
    <ul class="list">
      <li class="item" v-for="v in list" :key="v">{{v}}</li>
    </ul>
    <LoaderBottom ref="LoaderBottom" @loadData="loadData"></LoaderBottom>
  </div>
</template>

<script>
  import LoaderBottom from '@/modules/loader-bottom/LoaderBottom.vue'
  export default {
    data () {
      return {
        i: 0,
        list: [1, 2, 3, 4, 5]
      }
    },
    components: {
      LoaderBottom
    },
    methods: {
      // 满足条件后执行 loadData 加载数据。加载完成后执行 loaded，传 true 表示已经结束
      loadData (loaded) {
        this.i++
        this.$axios('/test').then(d => {
          this.list = this.list.concat(d)
          if (this.i > 3) {
            // 结束情况执行，传 true
            loaded(1)
          } else {
            // 元素渲染就绪后再执行
            loaded()
          }
          console.log('加载完成')
        })
      },
      // 模拟ajax
      $axios (url) {
        return new Promise(function (resolve) {
          setTimeout(d => {
            resolve([Math.random(), Math.random(), Math.random()])
          }, 100)
        })
      },
      reStart () {
        this.i = 0
        this.list = [1, 2, 3, 4, 5]

        // 重新加载
        this.$refs.LoaderBottom.reStart()
      }
    }
  }
</script>

<style scoped>
  .list{
    list-style: none;
    padding: 0;
    margin: 0;

  }
  .item{
    height: 60px;
    background-color: #ddd;
    margin: 6px 0;
  }
</style>
