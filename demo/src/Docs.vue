<template>
  <div>
    <div :class="$style.main">
      <div :class="$style.mid">
        <Article :content="docsCont" />
      </div>
    </div>
    <aside :class="$style.aside">
      <VMenu @select="menuSelect" />
    </aside>
    <div ref="eDemoFrame" :class="$style.right">
      <DemoFrame :path="demoPath" />
    </div>
  </div>
</template>

<script>
import VMenu from './VMenu.vue'
import DemoFrame from './DemoFrame.vue'
import Article from './Article.vue'
// import Vue from 'vue'
export default {
  components: {
    VMenu,
    DemoFrame,
    Article
  },
  data () {
    return {
      docsCont: '',
      demoPath: '/404'
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('update')
  //   let item = document.getElementById(to.query.path)
  //   if (item) item.click()
  //   next()
  // },
  mounted () {
    let eItem = document.getElementById(this.$route.query.path)
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
      // itemData.demo().then(m => {
      //   const Comp = Vue.extend(m.default)
      //   const comp = new Comp().$mount()
      //   document.body.appendChild(comp.$el)
      //   let eDemoFrame = this.$refs.eDemoFrame
      //   eDemoFrame.replaceChild(comp.$el, eDemoFrame.firstElementChild)
      // })

      itemData.docs().then(m => {
        this.docsCont = m.default
        // const Comp = Vue.extend(m.default)
        // const comp = new Comp().$mount()
        // document.body.appendChild(comp.$el)
        // let eDemoFrame = this.$refs.eDemoFrame
        // eDemoFrame.replaceChild(comp.$el, eDemoFrame.firstElementChild)
      })
      // console.log(itemData.demo)
      // location.hash = path.replace(/\.md$/, '')
      // this.articlePath = path
      // this.articleContent = await dataApi.getArticle(path)
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
}
.mid {
  /* margin-left: 300px;
  margin-right: 375px; */
  position: fixed;
  top: 0;
  right: 375px;
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
  width: 375px;
}
</style>
