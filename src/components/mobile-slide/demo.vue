<template>
  <div>
    <MobileSlideBase />
    <div>
      <button>左滑动</button>
      <button>右滑动</button>
    </div>
    <MobileSlide />
  </div>
</template>

<script>
import MobileSlideBase from '@/components/mobile-slide/base.vue'
import MobileSlide from '@/components/mobile-slide'
export default {
  components: {
    MobileSlideBase,
    MobileSlide
  }
}
</script>
