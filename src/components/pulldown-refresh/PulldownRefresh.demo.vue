<template>
  <div>
    <a href="javascript:;" @click="refresh">手动刷新</a>
    <div :class="$style.statList">
      <PulldownRefresh @reload="reload">
        <div v-for="(item, key) of list" :key="key" class="item">
          <div class="tit">{{ item.t }}</div>
          <div v-for="(it,k) of item.ls" :key="k" class="row">
            <span class="tt">{{ it.t }}</span>
            <span class="ct">{{ it.v }}</span>
          </div>
        </div>
      </PulldownRefresh>
    </div>
  </div>
</template>
<script>
import PulldownRefresh from '@/components/pulldown-refresh/PulldownRefresh.vue'
// mock
const axios = {
  get (url) {
    let page = /page=([^&]+)/.exec(url)[1]
    console.log(url)
    return new Promise(function (resolve) {
      setTimeout(function () {
        let list = require('@/components/bottom-load/BottomLoad.demo.data.js').default()[page - 1]
        resolve(list || [])
      }, 1000)
    })
  }
}
export default {
  components: {
    PulldownRefresh
  },
  data () {
    return {
      list: require('@/components/bottom-load/BottomLoad.demo.data.js').default()[0]
      // list: []
    }
  },
  methods: {
    async reload (complete) {
      let d = await axios.get('/getData?page=1')
      this.list = d
      complete(d.length === 0 ? 'noData' : undefined)
    },
    refresh () {
      this.$refs.VBottomLoadPage.refresh()
    }
  }
}
</script>

<style module>
.statList {
  background-color: #ddd;
}
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
