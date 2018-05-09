<template>
<div>
  <h2>随机选4个</h2>
  <ul ref="eUl">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
<button @click="start">start</button>
</div>
</template>

<script>
import RandomNums from './random-nums'
export default {
  mounted () {
    this.eItems = this.$refs.eUl.children
    this.randomNums = new RandomNums()
  },
  methods: {
    start () {
      let preItemsIndex = [0, 0, 0, 0]
      let eUl = this.$refs.eUl
      let {eItems} = this
      eUl.classList.remove('complete')
      this.randomNums.start(itemsIndex => {
        preItemsIndex.forEach(i => {
          eItems[i].classList.remove('active')
        })
        itemsIndex.forEach(i => {
          eItems[i].classList.add('active')
        })
        preItemsIndex = itemsIndex
      }, () => {
        eUl.classList.add('complete')
      })
    }
  }
}
</script>

<style scoped>

li {
  width: 30px;
  height: 30px;
  background-color: #ddd;
  display: inline-block
}


li.active {
  background-color: #000;
}
.complete li{
  display: none;
}
.complete li.active {
  display: inline-block;
}
</style>
