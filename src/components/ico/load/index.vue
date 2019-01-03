<template>
  <span :class="[$style.load,color==='white'?$style.loadWhite:'']"></span>
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
  display: inline-block;
  width: 20px;
  height: 20px;
  background-position: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  animation: preloader-spin 1s steps(12) infinite;
  background-image: url(./load.svg);
}
.loadWhite {
  background-image: url(./load-white.svg);
}
@keyframes preloader-spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
