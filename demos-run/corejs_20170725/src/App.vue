<template>
  <div>
    <timeUpdate/>
    <queueDemo></queueDemo>
    <animateTransitionDemo></animateTransitionDemo>
    <timeDeom></timeDeom>

  </div>
</template>

<script>
  // 搜索测试
  // import './modules/corejs/search/keyword-test/test'

  import queueDemo from './queue/demo'
  import animateTransitionDemo from './animation/AnimateTransition.vue'
  import timeDeom from './time/DateFormat.vue'
  import timeUpdate from './time/TimeUpdate.vue'
  export default {
    components: {
      queueDemo,
      animateTransitionDemo,
      timeDeom,
      timeUpdate
    }
  }
</script>
