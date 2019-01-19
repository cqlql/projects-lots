<template>
  <div>
    <MobileSlideBase ref="vMobileSlideBase" :imgs="imgsBase" />
    <div>
      <button @click="$refs.vMobileSlideBase.swipeLeft()">左滑动</button>
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
  },
  data () {
    return {
      imgsBase: [
        'https://m.360buyimg.com/babel/jfs/t1/25652/29/5592/100061/5c3eeb60E6f839b18/c42da29b3661ec39.jpg',
        'https://img1.360buyimg.com/pop/jfs/t1/23838/24/5600/92769/5c405bdfEf4c93379/554d6d8416870e23.jpg',
        'https://img1.360buyimg.com/pop/jfs/t1/7107/16/13498/182625/5c41dd82Eab1ba239/46d813c63951032b.jpg',
        'https://m.360buyimg.com/babel/jfs/t1/19482/24/5358/93845/5c3d3f9eEd3af48c9/cb2295923c4b3ab4.jpg'
      ]

    }
  }
}
</script>
