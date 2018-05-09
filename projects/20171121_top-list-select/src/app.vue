<template>
  <div>
    <div class="btn">
      <a @click="show">显示</a>
    </div>

    <TopListSelect :isShow="isShow" :list="list" @select="select" :childData="childData" @close="close"></TopListSelect>
  </div>

</template>

<script>
  import TopListSelect from './components/Main.vue'

  export default {
    data () {
      return {
        isShow: 0,
        list: [{
          id: 1,
          name: '班级',
          childComponentName: 'list' // 右侧组件名称
        }, {
          id: 2,
          name: '姓名',
          childComponentName: 'list'
        }, {
          id: 3,
          name: '年级',
          childComponentName: 'list'
        }, {
          id: 4,
          name: '日期'
        }, {
          id: 5,
          name: '学校',
          childComponentName: 'list'
        }],
        childData: []
      }
    },
    methods: {
      select (id) {
        switch (id) {
          case 1:
            this.$set(this, 'childData', [{
              name: '全部'
            }, {
              name: '三年级1班'
            }, {
              name: '三年级2班'
            }, {
              name: '三年级3班'
            }, {
              name: '三年级4班'
            }, {
              name: '三年级5班'
            }, {
              name: '三年级6班'
            }])
            break
          case 2:
            this.$set(this, 'childData', [{
              name: '李时勉'
            }, {
              name: '程老虎'
            }, {
              name: '李梅'
            }, {
              name: '于凯'
            }, {
              name: '王泽斌'
            }])
            break
          default:
            this.$set(this, 'childData', [{
              name: '全部'
            }, {
              name: '三年级1班'
            }, {
              name: '三年级2班'
            }, {
              name: '三年级3班'
            }, {
              name: '三年级4班'
            }, {
              name: '三年级5班'
            }, {
              name: '三年级6班'
            }])
        }
      },
      show () {
        this.isShow = 1
      },
      close () {
        console.log(123)
        this.isShow = 0
      }
    },
    components: {
      TopListSelect
    }
  }
</script>

<style scoped>
  .btn{
    text-align: center;
    font-size: 20px;
    padding: 10px;
  }
</style>
