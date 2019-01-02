<template>
  <div>
    <Transition
      :name="slideName"
      :enter-active-class="'leave '+activeClass"
      :leave-active-class="activeClass"
    >
      <RouterView />
    </Transition>
  </div>
</template>

<script>
// import Demo from '@/components/buttons/demo'
// import Demo from '@/views/stat-new/VList.demo.vue'
// import Demo from '@/views/stat-new/FilterBar.demo.vue'
// import Demo from '@/components/v-transition/demo.vue'
export default {
  data () {
    return {
      slideName: ''
    }
  },
  computed: {
    activeClass () {
      return this.slideName && 'slide-active'
    }
  },
  watch: {
    '$route' (to, from) {
      // if (from.name) {
      let toPath = to.path
      let fromPath = from.path
      toPath = toPath.trim().replace(/\/$/, '').replace(/\/+/, '/')
      fromPath = fromPath.trim().replace(/\/$/, '').replace(/\/+/, '/')
      let toDepth = toPath.split('/').length
      let fromDepth = fromPath.split('/').length
      if (toDepth === fromDepth) {
        toDepth = to.meta.zIndex
        fromDepth = from.meta.zIndex
      }
      this.slideName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      // }
    }
  }
}
</script>

<style scoped>
.slide-active {
  transition: 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  transition-property: opacity, transform;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
}
.leave {
  position: static;
}
.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(30px, 0, 0);
}
.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
}
</style>
