<template>
  <div>
    <button @click="test">test</button>
    <button @click="test2">test2</button>
    <div ref="box"></div>
  </div>
</template>

<script>
/* eslint-disable */
import imageParse from './imageParse'
export default {
  methods: {
    test () {
      imageParse({
        links: ["http://i40.shenduxuetang.com/e75feac5-ad27-4858-a4a3-c10cc8375691.jpg", "http://i41.shenduxuetang.com/1430306185210.png"],
        point: { start_x: 188, start_y: 893, end_x: 5550, end_y: 2361 },

        // links: ["http://i40.shenduxuetang.com/8d24b68a-71ee-42c8-8925-315a6b909159.jpg", "http://i41.shenduxuetang.com/1441545123710.png"],
        // point: {end_x:3725,end_y:1458,start_x:3283,start_y:1213},

        success: htmlContent => {
          this.$refs.box.innerHTML = htmlContent
        }
      })
    },
    test2 () {
      imageParse.fixedSizeParse({
        links: ["http://i40.shenduxuetang.com/edf9a5ae-a79c-43d3-a9de-73b7d2f826cd.jpg", "http://i41.shenduxuetang.com/1527757369465.png"],
        point: {end_x: 5061, end_y: 526, start_x: 4120, start_y: 282},

        success: htmlContent => {
          this.$refs.box.innerHTML = htmlContent
        }
      })
    }
  },
  components: {
  }
}
</script>
