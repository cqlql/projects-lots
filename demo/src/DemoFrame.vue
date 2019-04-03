<template>
  <iframe :class="$style.iframe" :src="src" />
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: '/404'
    }
  },
  computed: {
    src () {
      return '#' + this.path
    }
  }
}
</script>

<style module>
.iframe {
  /* position: fixed; */
  height: 100%;
  width: 100%;
  border: none;

}
</style>
