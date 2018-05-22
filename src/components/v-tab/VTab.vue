<template>
  <div class="tab">
    <ul class="list" @click="select">
      <li v-for="(name, i) in names" :key="i" class="item" :class="{selected:selectedIndex===i}" :data-index="i">{{name}}</li>
    </ul>
    <div class="cont">
      <slot/>
    </div>
  </div>
</template>

<script>
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
      if (target.tagName === 'LI') {
        this.selecteIndex(target.dataset.index * 1)
      }
    },
    selecteIndex (i) {
      if (this.selectedIndex === i) return
      this.selectedIndex = i
      this.$emit('change', i)
    }
  }
}
</script>

<style scoped>
.tab {
}
.list {
  display: flex;

  font-size: 14px;
  line-height: 2.4;
  color: #666;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 36px;
}
.item {
  flex: 1;
  text-align: center;
  /* position: relative; */

	height: 35px;
	background-color: #fff;
	border: solid 1px #f0f0f0;
  border-left-width: 0;
  border-bottom: none;
}
.item:first-child {
  border-left-width: 1px;
}
.selected {
  color: #40b883;
  font-weight: bold;
  background-color: #f9f9f9;
  height: 36px;
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
	background-color: #f9f9f9;
	border: solid 1px #f0f0f0;
}
</style>
