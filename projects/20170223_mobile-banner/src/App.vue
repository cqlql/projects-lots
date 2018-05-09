<template>
  <div>
    <Banner></Banner>
  </div>
</template>

<script>
  import Banner from './modules/banner-mobile/BannerMobile'
  export default {
    data () {
      return {
        i: 0,
        list: [1, 2, 3, 4, 5]
      }
    },
    components: {
      Banner
    },
    methods: {
      // 满足条件后执行 loadData 加载数据。加载完成后执行 loaded，传 true 表示已经结束
      loadData (loaded) {
      },
      forceUpdate () {
      }
    }
  }
</script>

<style scoped>
  ul{
    list-style: none;
    padding: 0;
    margin: 0;

  }
  li{
    height: 60px;
    background-color: #ddd;
    margin: 6px 0;
  }
</style>
