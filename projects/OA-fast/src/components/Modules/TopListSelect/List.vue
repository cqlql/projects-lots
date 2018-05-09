<template>
<div class="list">
  <ul @click="sel">
    <li v-for="(d,i) in list" :data-index="i" :class="{active:selected===i}">{{d.name}}</li>
  </ul>
</div>
</template>

<script>
  export default {
    props: ['list'],
    data () {
      return {
        selected: 0
      }
    },
    methods: {
      sel (e) {
        let {target} = e
        if (target.tagName === 'LI') {
          let {index} = target.dataset
          index *= 1
          this.selected = index
          this.$emit('close')
        }
      }
    }
  }
</script>

<style scoped>
.list{
  text-align: center;
  color: #999;
  font-size: 15px;
  li{
    padding: 14px 0;
    border-top: 1px solid #ccc;
    margin: 0 38px;
    position: relative;
    &:first-child{
      border: 0;
    }
    &.active:after{
      content: '\e73a';
      font-family: 'iconfont';
      float: right;
      color: #41ba5d;
      position: absolute;
      right: 0;
    }
  }
}
</style>
