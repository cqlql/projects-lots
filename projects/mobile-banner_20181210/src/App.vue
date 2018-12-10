<template>
  <div class="box">
    <MobileBanner :images="images" :type="1" />
  </div>
</template>

<script>
import MobileBanner from '@/components/mobile-banner'
export default {
  components: {
    MobileBanner
  },
  data () {
    return {
      images: [
        'http://imgs.ali213.net/IndexTJ/2018/12/09/20181209101447628.jpg',
        'http://imgs.ali213.net/IndexTJ/2018/12/08/2018120871533600.jpg',
        'http://imgs.ali213.net/IndexTJ/2018/12/08/2018120871015477.jpg'
      ],
      type: 1
    }
  }
}
</script>

<style scoped>
.box {
  height: 200px;
}
</style>
