<template>
  <div class="tab">
    <Scroller class="list" @click.native="select" ref="vScroller">
      <div v-for="(name, i) in names" :key="i" class="item" :class="{selected:selectedIndex===i}" :data-index="i">{{name}}</div>
    </Scroller>
    <div class="cont">
      <slot/>
    </div>
  </div>
</template>

<script>
import Scroller from '../scroller'
export default {
  props: {
    names: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedIndex: 0
    }
  },
  methods: {
    select ({ target }) {
      let index = target.dataset.index
      if (index) {
        index *= 1
        if (this.selectedIndex === index) return
        let pass = true
        this.$emit('change', index, function () {
          pass = false
        })
        if (pass) {
          this.selectedIndex = index
        }
      }
    },
    selectIndex (i) {
      this.selectedIndex = i
    }
  },
  watch: {
    names () {
      this.$nextTick(() => {
        this.$refs.vScroller.update()
      })
    }
  },
  components: {
    Scroller
  }
}
</script>

<style scoped>
/* .tab {
} */
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
}
.cont {
  background-color: #f9f9f9;
  border: solid 1px #f0f0f0;
  clear: both;
}
</style>
