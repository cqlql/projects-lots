<template>
  <div class="bc">
    <div class="btn-box">
      <button class="btn" @click="refresh">手动顶部刷新</button>
      <button class="btn" @click="reStart">手动底部重新加载</button>
    </div>
    <LoadRefresh
      ref="vLoadRefresh"
      :no-data="noData"
      :min-height="containerMinHeight"
      @load="load"
    >
      <div :class="$style.statList">
        <div v-for="(item, key) of list" :key="key" class="item">
          <div class="tit">{{ item.t }}</div>
          <div v-for="(it,k) of item.ls" :key="k" class="row">
            <span class="tt">{{ it.t }}</span>
            <span class="ct">{{ it.v }}</span>
          </div>
        </div>
      </div>
    </LoadRefresh>
  </div>
</template>

<script>
import LoadRefresh from '@/components/load-refresh/LoadRefresh.vue'
// mock
const axios = {
  get (url) {
    let page = /page=([^&]+)/.exec(url)[1]
    console.log(url)
    return new Promise(function (resolve) {
      setTimeout(function () {
        let list = require('@/components/scroll-bottom-load/Demo.page.data.js').default()[page - 1]
        // list = [] // 无数据模拟
        resolve(list || [])
      }, 1000)
    })
  }
}
export default {
  components: {
    LoadRefresh
  },
  data () {
    return {
      list: [],
      containerMinHeight: window.innerHeight - 50,
      noData: false
    }
  },
  methods: {
    async load ({ complete, page }) {
      let d = await axios.get('/getData?page=' + page)
      if (d.length) {
        if (page === 1) { // 第一页重新赋值
          this.list = d
        } else { // 追加情况
          this.list = this.list.concat(d)
        }
        complete()
      } else {
        // 没有任何数据
        this.noData = page === 1
        complete(true) // 结束
      }
    },
    refresh () {
      this.$refs.vLoadRefresh.refresh()
    },
    reStart () {
      this.list = []
      this.$refs.vLoadRefresh.reStart()
    }
  }
}
</script>
<style scoped>
.bc {
  background-color: #eee;
}
.btn-box {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
  .btn {
    float: right;
    clear: both;
  }
}
</style>
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