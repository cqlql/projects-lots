<template>
  <div class="region-selector">
    <div class="header"></div>
    <div></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      regionData: {
        provinces: [
          {
            code: "120000",
            value: "天津市"
          }
        ]
      }
    }
  }

}
</script>

<style scoped>
.region-selector {
  border: 1px solid #ddd;
}
</style>
