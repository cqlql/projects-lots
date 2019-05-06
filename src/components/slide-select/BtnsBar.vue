<template>
  <div class="s-bar">
    <a v-for="(btn,k) of btns" :key="k" :class="btn.style" @click="btn.fn">{{btn.name}}</a>
  </div>
</template>

<script>
export default {
  props: {
    btns: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.s-bar {
  height: 40px;
  border-bottom: 1px solid #ddd;
  display: flex;
  a {
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #26a2ff;
    /* float: left;
    width: 50%; */
  }
  .gray {
    color: #666;
  }
  .red {
    color: #f00;
  }
}
</style>
