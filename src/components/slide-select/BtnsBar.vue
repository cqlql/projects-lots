<template>
  <div class="s-bar">
    <a class="cl-btn" @click="$emit('cancel')">取消</a>
    <a class="cfm-btn" @click="$emit('confirm')">确认</a>
  </div>
</template>

<style scoped>
.s-bar {
  height: 40px;
  border-bottom: 1px solid #ddd;
  a {
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #26a2ff;
    float: left;
    width: 50%;
  }
  .cl-btn {
    color: #666;
  }
}
</style>
