<template>
  <div class="list">
    <ul @click="onSelectClick">
      <li v-for="(d,i) in childData" :data-index="i" :class="{active:selectedIndex===i}">{{d.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['childData'],
    data () {
      return {
        selectedIndex: 0
      }
    },
    methods: {
      onSelectClick (e) {
        let {target} = e
        if (target.tagName === 'LI') {
          let {index} = target.dataset
          index *= 1
          this.selectedIndex = index
          //          this.$emit('close')
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
    ul{
      list-style: none;
      padding: 0;
      margin: 0;
      -webkit-tap-highlight-color:transparent;
    }
    li{
      padding: 14px 0;
      border-top: 1px solid #ccc;
      margin: 0 38px;
      position: relative;
      &:first-child{
        border: 0;
      }
      &.active:after{
        content: '✓';
        font-weight: bold;
        float: right;
        color: #41ba5d;
        position: absolute;
        right: 0;
      }
    }
  }
</style>
