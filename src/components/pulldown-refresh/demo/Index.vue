<template>
  <div>
    <div class="btns">
      <p v-show="currentComponent!=='PulldownRefreshDemo'"><button @click="currentComponent='PulldownRefreshDemo'">切换到：仅仅只有下拉刷新的 demo</button></p>
      <p v-show="currentComponent!=='PulldownRefreshPlusDemo'"><button @click="currentComponent='PulldownRefreshPlusDemo'">切换到：window 为容器 demo</button></p>
      <p v-show="currentComponent!=='PulldownRefreshPlusSelfDemo'"><button @click="currentComponent='PulldownRefreshPlusSelfDemo'">切换到：自身为容器 demo</button></p>
      <p v-show="currentComponent!=='PulldownRefreshPlusElemDemo'"><button @click="currentComponent='PulldownRefreshPlusElemDemo'">切换到：以指定元素为容器的 demo</button></p>
    </div>
    <component :is="currentComponent" />
  </div>
</template>
<script>
import PulldownRefreshDemo from './PulldownRefreshDemo.vue'
import PulldownRefreshPlusDemo from './PulldownRefreshPlusDemo.vue'
import PulldownRefreshPlusSelfDemo from './PulldownRefreshPlusSelfDemo.vue'
import PulldownRefreshPlusElemDemo from './PulldownRefreshPlusElemDemo.vue'

export default {
  components: {
    PulldownRefreshDemo,
    PulldownRefreshPlusDemo,
    PulldownRefreshPlusSelfDemo,
    PulldownRefreshPlusElemDemo
  },
  data () {
    return {
      currentComponent: 'PulldownRefreshPlusDemo'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.btns {
  padding: 10px;
  border-bottom: 2px solid #ddd;
  p {
    padding: 0 0 2px;
  }
}
</style>
