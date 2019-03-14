<template>
  <div>
    <a href="javascript:;" @click="reload">重新加载</a>
    <div :class="$style.statList">
      <div v-for="(item, key) of list" :key="key" class="item">
        <div class="tit">{{ item.t }}</div>
        <div v-for="(it,k) of item.ls" :key="k" class="row">
          <span class="tt">{{ it.t }}</span>
          <span class="ct">{{ it.v }}</span>
        </div>
      </div>
      <ScrollBottomLoadPage ref="VScrollBottomLoadPage" @load="load" />
    </div>
  </div>
</template>
<script>
import ScrollBottomLoadPage from '@/components/scroll-bottom-load/ScrollBottomLoadPage.vue'
// mock
const axios = {
  get (url) {
    let page = /page=([^&]+)/.exec(url)[1]
    console.log(url)
    return new Promise(function (resolve) {
      setTimeout(function () {
        let list = require('./Demo.page.data.js').default()[page - 1]
        resolve(list || [])
      }, 1000)
    })
  }
}
export default {
  components: {
    ScrollBottomLoadPage
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
        complete(true) // 结束
      }
    },
    reload () {
      this.list = []
      this.$refs.VScrollBottomLoadPage.reload()
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
