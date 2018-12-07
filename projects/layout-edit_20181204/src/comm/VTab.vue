<template>
  <div class="tab">
    <ul class="list" @click="select">
      <li class="item" v-for="(item,i) of list" :class="{selected:selectedIndex===i, 'is-edit':selectedIndex===i&&$root.isEdit}" :data-index="i" :key="i">
        <span class="name">{{item}}<i class="edit-state"></i></span>
      </li>
    </ul>
  </div>

</template>

<script>
import scopeElements from '@/modules/corejs/dom/scope-elements'
export default {
  data () {
    return {
      selectedIndex: 0,
      list: [
        '学习导读',
        '生词学习',
        '阅读欣赏',
        '闯关练习',
        '视频学习'
      ]
    }
  },
  methods: {
    select ({ target }) {
      scopeElements(target, elem => {
        let {tagName} = elem
        if (tagName === 'UL') return false
        if (tagName === 'LI') {
          const index = elem.dataset.index * 1
          if (this.selectedIndex === index) return
          if (this.$root.isEdit) {
            this.$confirm('未保存，是否离开？', () => {
              this.$root.isEdit = false
              this.$emit('change', index)
              this.selectedIndex = index
            })
          } else {
            this.$emit('change', index)
            this.selectedIndex = index
          }
          return false
        }
      })
    },
    selecteIndex (i) {
      this.selectedIndex = i
    }
  }
}
</script>

<style scoped>
.tab {
  position: fixed;
  top: 58px;
  left: 210px;
  right: 0;
  height: 65px;
  z-index: 1;
  background-color: #fff;
}
.list {
  margin: 0 30px 0;
  border-bottom: 1px solid #e8e8e8;

  display: flex;

  font-size: 18px;
  line-height: 4;
  color: #666;
}
.item {
  /* width: 150px; */
  flex: 1;
  height: 65px;
  text-align: center;
  position: relative;
}
.name {
  position: relative;
}
.edit-state {
  position: absolute;
  right: -10px;
  top: 0px;
  width: 8px;
  height: 8px;
  background-color: #ed5564;
  border-radius: 100%;
  display: none;

}
.is-edit .edit-state {
  display: block;
}
.selected {
  color: #40b883;
  font-weight: bold;
}
.selected::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5px;
  background-color: #40b883;
}
</style>
