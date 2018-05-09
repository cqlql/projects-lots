<template>
  <div>
    <div class="box">
      <FontZoom :list="list"></FontZoom>


      <a @click="list=['英语', '数学', '数学', '体育', '语文', '化学', '历史', '物理', '自习', '数学', '数学', '体育', '语文', '化学', '历史', '物理', '自习']">更换数据</a>
    </div>
  </div>
</template>

<script>
  import FontZoom from './modules/font-zoom/FontZoom'

  export default {
    data () {
      return {
        list: ['英语', '数学', '数学', '体育', '语文', '化学', '历史', '物理', '自习']
      }
    },
    components: {
      FontZoom
    }
  }
</script>

<style>
  .box {
    font-size: 24px;
    border: 1px solid #333;
    max-height: 245px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 1em;
    }

    li {

      line-height: 1.46;
    }
  }
</style>
