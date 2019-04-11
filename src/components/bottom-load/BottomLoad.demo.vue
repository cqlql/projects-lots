<template>
  <div>
    <a href="javascript:;" @click="restart">重新加载</a>
    <div :class="$style.statList">
      <div v-for="(item, key) of list" :key="key" class="item">
        <div class="tit">{{ item.t }}</div>
        <div v-for="(it,k) of item.ls" :key="k" class="row">
          <span class="tt">{{ it.t }}</span>
          <span class="ct">{{ it.v }}</span>
        </div>
      </div>
      <BottomLoad ref="VBottomLoadPage" @load="load" />
    </div>
  </div>
</template>
<script>
import BottomLoad from '@/components/bottom-load/BottomLoad.vue'
// mock
const axios = {
  get (url) {
    let page = /page=([^&]+)/.exec(url)[1]
    console.log(url)
    return new Promise(function (resolve) {
      setTimeout(function () {
        let list = require('./BottomLoad.data.js').default()[page - 1]
        resolve(list || [])
      }, 1000)
    })
  }
}
export default {
  components: {
    BottomLoad
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    async load ({ complete, page }) {
      let d = await axios.get('/getData?page=' + page)
      if (d.length) {
        this.list = this.list.concat(d)
        complete()
      } else {
        complete('finish') // 结束
      }
    },
    restart () {
      this.list = []
      this.$refs.VBottomLoadPage.restart()
    }
  }
}
</script>

<style module>
.statList :global{
  .item {
    color: #999;
    padding: 10px 12px;
    border-top: 1px solid #ddd;
    background: #fff;
    /* padding: 0 12px; */
  }
  .item:first-child {
    border-top: none;
  }
  .tit {
    font-size: 18px;
    color: #555;
    padding: 8px 0;
  }

  .row {
    padding: 8px 0
  }
  .em {
    color: #f60;
  }
}
</style>
