<template>
  <div>
    <div :class="$style.btns">
      <h1 :class="$style.h1">这是仅仅只有下拉刷新的 demo</h1>
      <p><button @click="refresh">手动刷新</button></p>
      <p><button @click="noDataDemo">切换到无数据情况</button></p>
    </div>
    <div :class="$style.statList">
      <PulldownRefresh class="PulldownRefresh" ref="vPulldownRefresh" :reload="reload">
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
import axios from '@/components/pulldown-refresh/demo/mock-axios.js'
export default {
  components: {
    PulldownRefresh
  },
  data () {
    return {
      list: [],
      containerMinHeight: window.innerHeight - 50,
      page: 1
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.vPulldownRefresh.refresh()
    }, 10)
  },
  methods: {
    async reload () {
      let d = await axios.get(`/getData?page=${this.page}&onepage=false&nodata=false`)
      this.list = d
      return d.length === 0 ? 'noData' : undefined
    },
    refresh () {
      this.page = 1
      this.$refs.vPulldownRefresh.refresh()
    },
    noDataDemo () {
      this.page = 10
      this.$refs.vPulldownRefresh.refresh()
    }
  }
}
</script>

<style module>
.btns {
  padding: 10px;
}
.h1 {
  padding: 4px 0 10px;
  font-size: 16px;
  font-weight: bold;
}
.PulldownRefresh {
  /* min-height: 600px; */
}
.statList {
  background-color: #f3f3f3;
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
