<template>
  <div class="banner">
    <ul class="move">
      <!--<li v-for="src in list">
        <img :src="src"/>
      </li>-->
    </ul>
    <ul class="btn"></ul>
  </div>
</template>

<script>
  import Banner from '@/utils/banner-mobile/banner-mobile'
  let banner = new Banner()
  export default {
    name: 'banner-mobile',
    props: ['list'],
    mounted () {
      let {$el, list} = this
      this.eMove = $el.children[0]
      this.buildItems(list)
      banner.init({
        eBox: this.$el,
        timerInterval: 0
      })
    },
    destroyed () {
      banner.destroy()
    },
    methods: {
      buildItems (list) {
        let lis = ''
        list.forEach(src => {
          lis += `<li><img src="${src}"/></li>`
        })
        this.eMove.innerHTML = lis
      }
    },
    watch: {
      list (list) {
        this.buildItems(list)
        banner.update()
      }
    }
  }
</script>

<style>
  .banner {
    width: 860px;
    height: 535px;
    background-color: #000;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    .move {
      margin: 0;
      padding: 0;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .move li {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-align: center;

      img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    }
    .btn {
      margin: 0;
      padding: 0;
      line-height: 0;
      position: absolute;
      /*bottom: 6px;*/
      bottom: 0;
      width: 100%;
      /*height: 10px;*/
      text-align: center;
    }
    .btn li {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin: 0 4px;
      border: 10px solid transparent;

    }
    /*.btn li.active {
      background-color: #0077c6;
    }*/
    .btn b {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
    }
    .btn .active b {
      background-color: #0077c6;
    }
    .animated {
      transition:transform 0.3s ease;
    }

  }

</style>
