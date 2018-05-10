<template>
  <div :class="color==='white'?$style.loadWhite:$style.load"></div>
</template>

<script>
export default {
  props: {
    color: String
  }
}
</script>

<style module>
.load {
  background-image: url(./load.svg);
}
.loadWhite {
  background-image: url(./load-white.svg);
}
</style>

