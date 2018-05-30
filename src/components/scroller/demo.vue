<template>
  <div class="box">
    <VBtn @click="add">增加选项</VBtn>
    <div class="scroll-box">
      <Scroller class="list" @click.native="select" ref="vScroller">
        <div v-for="(name, i) in names" :key="i" class="item" :class="{selected:selectedIndex===i}" :data-index="i">{{name}}</div>
      </Scroller>
      <div class="cont">
        {{names[selectedIndex]}}
      </div>
    </div>
  </div>
</template>

<script>
import VBtn from '../buttons/VButton'
import Scroller from './index'
export default {
  data () {
    return {
      names: ['第1项', '第2项', '第3项'],
      selectedIndex: 0
    }
  },
  mounted () {
    this.unBindWindowResize = this.bindWindowResize()
    this.$refs.vScroller.update()
  },
  methods: {
    add () {
      this.names.push(`第${this.names.length + 1}项`)
      this.$nextTick(() => {
        this.$refs.vScroller.update()
      })
    },
    select ({ target }) {
      let index = target.dataset.index
      if (index) {
        this.selecteIndex(index * 1)
      }
    },
    selecteIndex (i) {
      if (this.selectedIndex === i) return
      this.selectedIndex = i
      this.$emit('change', i)
    },
    bindWindowResize () {
      const windowResize = () => {
        this.$refs.vScroller.update()
      }
      window.addEventListener('resize', windowResize)

      return function () {
        window.removeEventListener('resize', windowResize)
      }
    }
  },
  destroyed () {
    this.unBindWindowResize()
  },
  components: {
    Scroller,
    VBtn
  }
}
</script>

<style scoped>
.box {
  padding: 10px;
}
.scroll-box {
  padding: 10px;
}
.tab {
}
.list {
  font-size: 14px;
  line-height: 2.4;
  color: #666;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: -1px;
  white-space: nowrap;
  border: solid 1px #f0f0f0;
  border-bottom: none;
  overflow: hidden;

  float: left;
  max-width: 100%;
  box-sizing: border-box;
}

.list /deep/ .move {
  display: flex;
}

.item {
  text-align: center;
  width: 80px;
  padding: 0 20px;
  box-sizing: border-box;

  height: 35px;
  background-color: #fff;
  border-left: solid 1px #f0f0f0;
  border-bottom: solid 1px #f0f0f0;
}
.item:first-child {
  border-left: none;
}
.selected {
  color: #40b883;
  font-weight: bold;
  background-color: #f9f9f9;
  border-bottom-color: #f9f9f9;
  /* border-bottom: solid 1px #f9f9f9; */
  /* height: 36px; */
  /* height: 36px; */
}
/* .selected::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 5px;
  background-color: #f9f9f9;
} */
.cont {
  padding: 10px;
  background-color: #f9f9f9;
  border: solid 1px #f0f0f0;
  clear: both;
}
</style>

