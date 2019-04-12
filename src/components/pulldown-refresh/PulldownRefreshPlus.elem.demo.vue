<template>
  <div :class="$style.box">
    <h1 :class="$style.h1">这是以指定元素为容器的demo</h1>
    <a href="javascript:;" @click="refresh">手动刷新</a>
    <a href="javascript:;" @click="noDataDemo">切换到无数情况</a>
    <div :class="$style.statList">
      <PulldownRefreshPlus ref="vPulldownRefresh" :load="load" :min-height="containerMinHeight" :get-elem="() => $el">
        <div v-for="(item, key) of list" :key="key" class="item">
          <div class="tit">{{ item.t }}</div>
          <div v-for="(it,k) of item.ls" :key="k" class="row">
            <span class="tt">{{ it.t }}</span>
            <span class="ct">{{ it.v }}</span>
          </div>
        </div>
      </PulldownRefreshPlus>
    </div>
  </div>
</template>
<script>
import PulldownRefreshPlus from '@/components/pulldown-refresh/PulldownRefreshPlus.vue'
// mock
import getMockList from '@/components/bottom-load/BottomLoad.demo.data.js'
let useList = getMockList()
const axios = {
  get (url) {
    let page = /page=([^&]+)/.exec(url)[1]
    console.log(url)
    return new Promise(function (resolve) {
      setTimeout(function () {
        let list = useList[page - 1]
        resolve(list || [])
      }, 1000)
    })
  }
}
export default {
  components: {
    PulldownRefreshPlus
  },
  data () {
    return {
      list: [],
      containerMinHeight: 500 - 50
    }
  },
  methods: {
    async load (page) {
      let d = await axios.get('/getData?page=' + page)
      let allList
      if (page === 1) { // 刷新
        allList = this.list = d
      } else {
        allList = this.list = this.list.concat(d)
      }
      if (!allList.length) {
        return 'noData'
      }
      if (!d.length) {
        return 'finish'
      }
    },
    refresh () {
      useList = getMockList()
      this.$refs.vPulldownRefresh.refresh()
    },
    noDataDemo () {
      useList = []
      this.$refs.vPulldownRefresh.refresh()
    }
  }
}
</script>

<style module>
.box {
  position: relative;
  margin: 10px;
  height: 500px;
  overflow: auto;
  border: 2px solid #999;
}
.h1 {
  padding: 4px 0;
  /* font-size: 16px; */
  font-weight: bold;
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
