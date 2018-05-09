<template>
  <transition name="fade">
    <div class="mask" @click="$emit('click')"></div>
  </transition>
</template>

<style scoped>
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9;
  }
  .fade-enter-active, .fade-leave-active {
    transition: .3s;
    transition-property:opacity;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
