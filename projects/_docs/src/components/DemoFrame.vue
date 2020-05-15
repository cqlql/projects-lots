<template>
  <div :class="[$style.frame,$style[env]]">
    <iframe :class="$style.iframe" :src="src" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: '/404'
    },
    env: String
  },
  computed: {
    src () {
      const { path } = this
      if (/^https?:\/\//.test(path)) {
        return path
      }
      return '#' + path
    }
  }
}
</script>

<style module>
.frame {
  width: 375px;
  height: 667px;
  margin: 10px auto;
}
.iframe {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e3e3e4;
  box-shadow: 0px 0px 20px 0px #e8e8e8;
  overflow: hidden;
}
.pc {
  position: absolute;
  left: 10px;
  top: 10px;
  bottom: 10px;
  right: 10px;
  width: auto;
  height: auto;
  margin: 0;
}
</style>
