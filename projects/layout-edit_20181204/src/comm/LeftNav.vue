<template>
  <DragView class="left-nav" @resize="w=>$emit('resize',w)" :minWidth="150">
    <h2 class="h2">
      课程目录
      <a class="add" href="javascript:;" @click="onAdd"></a>
    </h2>
    <div class="list">
      <LeftNavItemAdd ref="vAddItem" @save="onSave"/>
      <LeftNavItemEdit v-for="(item,i) of allHistoryLessons" :key="item.id" :data="item" @select="onSelect" @del="onDel" :selectedId="selectedId" :index="i"/>
      <div v-if="hasData===false" class="no-data">
        <a href="javascript:void(0)" @click="onAdd">没有课程，添加一个试试？</a>
      </div>
    </div>
  </DragView>
</template>

<script>
import LeftNavItemEdit from './LeftNavItemEdit'
import LeftNavItemAdd from './LeftNavItemAdd'
import ajaxApi from '@/modules/ajax-api'
import DragView from '@/components/drag-view'
export default {
  // props: {
  //   data: Array
  // },
  data () {
    return {
      hasData: null,
      allHistoryLessons: [],
      selectedId: -1
    }
  },
  created () {
    // 加载左边菜单
    ajaxApi.getAllHistoryLessons().then(data => {
      if (data) {
        this.allHistoryLessons = data
      }
      this.$emit('load', (this.hasData = Boolean(data)))
    })
  },
  methods: {
    // 初始选中第一项
    initSelect () {
      let {allHistoryLessons} = this
      let selectedId = this.selectedId = (allHistoryLessons[0] || {}).id
      if (selectedId !== undefined) {
        this.loadLessonById(selectedId)
      }
    },
    loadLessonById (id) {
      ajaxApi.getLessonById(id).then(result => {
        this.$root.lessonData = result
      })
    },
    onSelect ({id}) {
      if (this.selectedId === id) return
      if (this.$root.isEdit) {
        this.$confirm('未保存，是否离开？', () => {
          this.$root.isEdit = false
          this.loadLessonById(id)
          this.selectedId = id
        })
      } else {
        this.loadLessonById(id)
        this.selectedId = id
      }
    },
    onAdd () {
      this.$refs.vAddItem.show()
    },
    onSave (v) {
      ajaxApi.posthistorylesson(v).then(result => {
        this.allHistoryLessons.unshift(result)
        this.$toast.success('新增成功')
      })
    },
    onDel (index) {
      this.allHistoryLessons.splice(index, 1)
    }
  },
  watch: {
    allHistoryLessons (data) {
      this.initSelect()
      this.hasData = Boolean(data)
    },
    hasData (has) {
      this.$emit('hasDataChange', has)
    },
    isAdd () {

    }
  },
  components: {
    LeftNavItemEdit,
    LeftNavItemAdd,
    DragView
  }
}
</script>

<style scoped>
.left-nav {
  position: fixed;
  top: 58px;
  bottom: 0;
  width: 210px;
  background-color: #e8e8e8;
  z-index: 2;
}
.h2 {
  font-size: 16px;
  color: #000;
  height: 65px;
  padding-left: 38px;
  padding-top: 22px;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.add {
  position: absolute;
  top: 22px;
  right: 26px;
  display: inline-block;
  background: url("@/assets/icon.png") no-repeat 0 -47px;
  width: 20px;
  height: 20px;
}
.list {
  background-color: #f6f6f6;
  position: absolute;
  top: 65px;
  bottom: 0;
  width: 100%;
  overflow: auto;
}

.no-data {
  padding: 10px;
  color: #ea0000;
  /* font-size: 14px; */
}

</style>

