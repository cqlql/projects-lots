<template>
  <div>
    <button @click="test">test</button>
    <div ref="box"></div>
  </div>
</template>

<script>
/* eslint-disable */
import imageParse from './imageParse'
export default {
  methods: {
    test () {
      let links = ['http://i40.shenduxuetang.com/49ef3d2f-545f-4f47-98f4-d2ebb0a4526f.jpg']
      // links = ['1.jpg']

      let point = { start_x: 0, start_y: 1627, end_x: 940, end_y: 1872 }
      // point = {
      //   'end_x': '2878.75',
      //   'end_y': '1862.72',
      //   'start_x': '526.83',
      //   'start_y': '1458.19'
      // }

      imageParse({
        // links,
        links: ["http://i40.shenduxuetang.com/e75feac5-ad27-4858-a4a3-c10cc8375691.jpg", "http://i41.shenduxuetang.com/1430306185210.png"],
        point:{start_x: 188, start_y: 893, end_x: 5550, end_y: 2361},
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
