<template>
  <div :class="$style.frame">
    <iframe :class="$style.iframe" :src="src" />
  </div>
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
.frame {
  /* padding: 20px;
  box-sizing: border-box; */
  /* height: 100%;
  width: 100%; */
  width: 375px;
  height: 667px;
  /* position: fixed; */
  position:absolute;
  left: 50%;
  top: 50%;
  margin: -333px 0 0 -187px;
  /* display: table; */
  /* z-index: 99;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  /* margin: auto; */
}
.iframe {
  /* position: fixed; */
  height: 100%;
  width: 100%;
  border: none;
  box-sizing: border-box;
  border: 1px solid #e3e3e4;
  box-shadow: 0px 0px 20px 0px #e8e8e8;
  overflow: hidden;
}
</style>
