<template>
  <div :class="$style.box">
    <RefreshTop ref="vRefreshTop" @reload="reload" :style="{'min-height': minHeight + 'px'}">
      <ul :class="$style.list">
        <li :class="$style.item" v-for="v in total" :key="v">{{v}}</li>
      </ul>
    </RefreshTop>
    <div :class="$style.btns">
      <button :class="$style.btn" @click="refresh">手动刷新</button>
      <button :class="$style.btn" @click="total+=20">加20条数据</button>
    </div>

    <div :class="$style.bottomBar"></div>
  </div>
</template>

<script>
import RefreshTop from '@/modules/refresh-top/RefreshTop.vue'
export default {
  data () {
    return {
      total: 1,
      minHeight: 0
    }
  },
  components: {
    RefreshTop
  },
  mounted () {
    // 内容太少，高度不够解决方案
    this.minHeight = window.innerHeight - 120
  },
  methods: {
    // 满足条件后执行 reload，触发刷新，加载数据。加载完成后执行 complete
    reload (complete) {
      this.$axios('/test').then(d => {
        console.log('请求完成')
        complete()
      })
    },
    refresh () {
      this.$refs.vRefreshTop.refresh()
    },
    // 模拟ajax
    $axios (url) {
      return new Promise(function (resolve) {
        setTimeout(d => {
          resolve([Math.random(), Math.random(), Math.random()])
        }, 1000)
      })
    }
  }
}
</script>

<style module>
.box {
  background-color: #e6e6e6;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #eee;
  padding-bottom: 100px;
}
.item {
  /* height: 10px; */
  background-color: #d6d6d6;
  margin: 6px 0;
}
.btns {
  position: fixed;
  right: 0;
  top: 0;
}
.bottomBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: #b7b7b7;
}
</style>
