<template>
  <div :class="$style.box">
    <div :class="$style.black">
      <div :class="$style.load"></div>
    </div>
    <div :class="$style.white">
      <div :class="[$style.load, $style.loadWhite]"></div>
    </div>

  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style module>
.box {
  padding: 20px;
}
.black {
  float: left;
  padding: 10px;
}
.white {
  float: left;
  padding: 8px;
  height: 34px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}
.load {
  display: inline-block;
  width: 34px;
  height: 34px;
  background-image: url(@/assets/preloader.svg);
  background-position: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  animation: preloader-spin 1s steps(12, end) infinite;
}
.loadWhite {
  background-image: url(@/assets/preloader-white.svg);
}
@keyframes preloader-spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>


