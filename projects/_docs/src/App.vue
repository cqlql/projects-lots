<template>
  <div>
    <DragView
      :width.sync="menuWidth" :class="$style.aside" :max-width="500" @resize="onResize"
      @start="onDragStart" @end="onDragEnd"
    >
      <VMenu ref="vMenu" :data="menuData" @select="menuSelect" />
    </DragView>
    <!-- <aside :class="$style.aside" :style="{width:menuWidth+'px'}">
      <VMenu ref="vMenu" :data="menuData" @select="menuSelect" />
      <DragBar :class="$style.bar" :size.sync="menuWidth" @change="onResize" :max="500" :min="20" />
    </aside> -->
    <div v-show="hasDocs" :class="$style.mid" :style="{left:menuWidth+1+'px', right: showDemo ? rightWidth + 'px' : '0px' }">
      <div :class="$style.midCont">
        <Article ref="vArticle" :content="docsCont" />
      </div>
      <DragBar :class="$style.bar" :size.sync="rightWidth" :change="onResizeMid"
        @start="onDragStart" @end="onDragEnd"
      />
    </div>
    <div v-if="!hasDocs" :class="$style.mid" :style="{left:menuWidth+1+'px', right:'0px'}">
      <DemoFrame :path="demoPath" :env="env" />
      <div v-show="frameMarkShow" :class="$style.mark"></div>
    </div>
    <div v-show="hasDocs&&showDemo" :class="$style.right" :style="{width:rightWidth-1+'px'}">
      <DemoFrame :path="demoPath" :env="env" />
      <div v-show="frameMarkShow" :class="$style.mark"></div>
    </div>
  </div>
</template>

<script>
import VMenu from './components/VMenu2.vue'
import DemoFrame from './components/DemoFrame.vue'
import Article from './components/Article.vue'
import DragView from '@/components/drag-view/index.vue'
import DragBar from '@/components/drag-bar'
import dataApi from './data-api'
// import Vue from 'vue'
export default {
  components: {
    VMenu,
    DemoFrame,
    Article,
    DragView,
    DragBar
  },
  data () {
    return {
      docsCont: '',
      demoPath: '/404',

      // 菜单宽
      menuWidth: (localStorage.getItem('leftMenuWidth') || 300) * 1,
      // 中间内容
      // midLeft: (localStorage.getItem('midLeft') || 300) * 1,
      // midRight: 391,
      // 右边宽
      rightWidth: 391,

      hasDocs: false,

      frameMarkShow: false, // 解决拖动遇iframe失效问题，拖动时为 true

      showDemo: true,
      menuData: [],
      env: 'mob'
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
      this.env = itemData.env
      this.hasDocs = !itemData.noDocs
      const path = this.demoPath = itemData.path
      this.$router.push({
        path: '/',
        query: {
          path
        }
      }).catch(() => {})

      if (itemData.demo || /^https?:\/\//.test(path)) {
        this.midRight = 391
        this.showDemo = true
      } else {
        this.midRight = 0
        this.showDemo = false
      }

      if (this.showItem) this.showItem.show = false // 隐藏文章大纲
      if (itemData.docs) {
        this.docsCont = (await itemData.docs()).default
        await this.$nextTick()
        if (newItemData.secondChild === null) {
          newItemData.secondChild = this.$refs.vArticle.getOutlineData()
        }
        newItemData.show = true // 显示文章大纲
        this.showItem = newItemData
      } else {
        this.docsCont = '<strong>未编写文档</strong>'
      }
    },
    onDragStart () {
      this.frameMarkShow = true
    },
    onDragEnd () {
      this.frameMarkShow = false
    },
    onResize (width) {
      // const midLeft = this.midLeft = x
      localStorage.setItem('leftMenuWidth', width)
      // localStorage.setItem('midLeft', midLeft)
    },
    onResizeMid ({ len, start }) {
      let width = start - len
      const maxW = innerWidth - this.menuWidth - 21
      if (width < 386) {
        width = 386
      } else if (width > maxW) {
        width = maxW
      }
      this.rightWidth = width
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.updateWinSize)
  }
}
</script>

<style module>
.main {
  /* float: left; */
  /* width: 100%; */
  min-height: 100px;
}
.aside:global.dv-box {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 300px;
  height: 100%;
  border-right: 1px solid #efefef;
  /* box-sizing: border-box; */
}
.mid {
  /* margin-left: 300px;
  margin-right: 375px; */
  position: fixed;
  top: 0;
  right: 391px;
  left: 300px;
  bottom: 0;
  z-index: 1;

  /* overflow: auto; */

  /* width: 100%;
  padding: 10px;
  padding-right: 0; */
  /* box-sizing: border-box; */
  /* overflow: auto;
  padding: 10px;
  padding-right: 0;
  box-sizing: border-box; */
}

.midCont {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.right {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 390px;
  border-left: 1px solid #efefef;
}
.mark {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
