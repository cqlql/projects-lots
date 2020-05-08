<template>
  <div>
    <div :class="$style.mid" :style="{left:midLeft+'px', right:midRight+'px'}">
      <Article :content="docsCont" />
    </div>
    <DragView v-model="menuWidth" :class="$style.aside" :max-width="500" @resize="onResize">
      <!-- <aside :class="$style.aside"> -->
      <VMenu @select="menuSelect" />
      <!-- </aside> -->
    </DragView>
    <div v-show="showDemo" :class="$style.right">
      <DemoFrame :path="demoPath" />
    </div>
  </div>
</template>

<script>
import VMenu from './components/VMenu.vue'
import DemoFrame from './components/DemoFrame.vue'
import Article from './components/Article.vue'
import DragView from '@/components/drag-view/index.vue'
// import Vue from 'vue'
export default {
  components: {
    VMenu,
    DemoFrame,
    Article,
    DragView
  },
  data () {
    return {
      docsCont: '',
      demoPath: '/404',

      // 窗口大小
      menuWidth: (localStorage.getItem('leftMenuWidth') || 300) * 1,
      // 中间内容x
      midLeft: (localStorage.getItem('midLeft') || 300) * 1,
      midRight: 391,

      showDemo: true
    }
  },
  mounted () {
    let eItem = document.getElementById(this.$route.query.path || '/readme')
    if (eItem) eItem.click()
  },
  methods: {
    async menuSelect (itemData) {
      let path = this.demoPath = itemData.path
      this.$router.push({
        path: '/',
        query: {
          path
        }
      })

      if (itemData.demo) {
        this.midRight = 391
        this.showDemo = true
      } else {
        this.midRight = 0
        this.showDemo = false
      }

      if (itemData.docs) {
        this.docsCont = (await itemData.docs()).default
      } else {
        this.docsCont = '未编写文档'
      }
    },
    onResize (x) {
      let midLeft = this.midLeft = x
      localStorage.setItem('leftMenuWidth', x)
      localStorage.setItem('midLeft', midLeft)
    }
  }
}
</script>

<style module>
.main {
  /* float: left; */
  /* width: 100%; */
  min-height: 100px;
}
.aside {
  position: fixed;
  top: 0;
  width: 300px;
  height: 100%;
  border-right: 1px solid #efefef;
}
.mid {
  /* margin-left: 300px;
  margin-right: 375px; */
  position: fixed;
  top: 0;
  right: 391px;
  left: 300px;
  bottom: 0;
  overflow: auto;
  padding: 10px;
  padding-right: 0;
}
.right {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 390px;
  border-left: 1px solid #efefef;
}
</style>
