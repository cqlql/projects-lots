<template>
  <div class="bc">
    <LoadRefresh
      ref="vLoadRefresh" color-top="white" color-bottom="white"
      @bottomLoad="onBottomLoad" @refreshLoad="onRefreshLoad"
    >
      <ul class="list">
        <li v-for="(v,i) in list" :key="i" class="item">{{ v }}</li>
      </ul>
    </LoadRefresh>
    <div class="btn-box">
      <button class="btn" @click="refresh">手动顶部刷新</button>
      <button class="btn" @click="reStart">手动底部重新加载</button>
    </div>
  </div>
</template>

<script>
import LoadRefresh from '@/components/load-refresh'
export default {
  components: {
    LoadRefresh
  },
  data () {
    return {
      list: [],
      isFinish: 0
    }
  },
  methods: {
    onBottomLoad ({ complete, vLoaderBottom }) {
      this.$axios('/test').then(d => {
        // 下拉加载情况

        this.list = this.list.concat(d)

        // 底部加载控件隐藏
        // vLoaderBottom.hide()

        // 加载完成
        // 将进行到底检测。或者传入 true 加载结束
        complete((++this.isFinish > 2))
      })
    },
    // 刷新情况
    onRefreshLoad ({ complete, vLoaderBottom }) {
      this.$axios('/test').then(d => {
        this.isFinish = 0

        this.list = d

        // 加载完成
        // 将进行到底检测。或者传入 true 加载结束
        complete((++this.isFinish > 2))
      })
    },
    refresh () {
      this.$refs.vLoadRefresh.refresh()
    },
    reStart () {
      this.list = [1, 2, 3, 4, 5, 6, 7]
      this.isFinish = 0

      this.$refs.vLoadRefresh.reStart()
    },
    // 模拟ajax
    $axios (url) {
      return new Promise(function (resolve) {
        setTimeout(() => {
          resolve([Math.random(), Math.random(), Math.random()])
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
.bc {
  background-color: #aaa;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item {
  height: 60px;
  background-color: #ddd;
  margin: 6px 0;
}

.btn-box {
  position: fixed;
  right: 0;
  top: 0;
  .btn {
    float: right;
    clear: both;
  }
}
</style>
