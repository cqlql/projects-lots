<template>
  <div>
    <div :class="$style.mid" :style="{left:midLeft+'px', right:midRight+'px'}">
      <Article ref="vArticle" :content="docsCont" />
    </div>
    <DragView v-model="menuWidth" :class="$style.aside" :max-width="500" @resize="onResize">
      <!-- <aside :class="$style.aside"> -->
      <VMenu ref="vMenu" :data="menuData" @select="menuSelect" />
      <!-- </aside> -->
    </DragView>
    <div v-show="showDemo" :class="$style.right">
      <DemoFrame :path="demoPath" />
    </div>
  </div>
</template>

<script>
import VMenu from './components/VMenu2.vue'
import DemoFrame from './components/DemoFrame.vue'
import Article from './components/Article.vue'
import DragView from '@/components/drag-view/index.vue'
import dataApi from './data-api'
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

      showDemo: true,
      menuData: []
    }
  },
  mounted () {
    this.menuData = dataApi.getMenuDataView()
    let { path, id } = this.$route.query
    if (!path) path = '/my-note'
    this.menuSelect({ id: path }).then(() => {
      const { vArticle, vMenu } = this.$refs
      if (id) {
        vArticle.scrollTop(id)
        vMenu.selectedId = id
      } else {
        vMenu.selectedId = path
      }
    })
  },
  methods: {
    async menuSelect ({ id, isChild }) {
      if (isChild) {
        this.$refs.vArticle.scrollTop(id)
        this.$router.push({
          path: '/',
          query: {
            path: this.$route.query.path,
            id
          }
        }).catch(() => {})
        return
      }
      const { item: itemData, newItem: newItemData } = dataApi.menuDataKey[id]
      const path = this.demoPath = itemData.path
      this.$router.push({
        path: '/',
        query: {
          path
        }
      }).catch(() => {})

      if (itemData.demo) {
        this.midRight = 391
        this.showDemo = true
      } else {
        this.midRight = 0
        this.showDemo = false
      }

      if (itemData.docs) {
        this.docsCont = (await itemData.docs()).default
        await this.$nextTick()
        if (newItemData.secondChild === null) {
          newItemData.secondChild = this.$refs.vArticle.getOutlineData()
        }
        if (this.showItem) this.showItem.show = false
        newItemData.show = true
        this.showItem = newItemData
      } else {
        this.docsCont = '未编写文档'
      }
    },
    onResize (x) {
      const midLeft = this.midLeft = x
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
