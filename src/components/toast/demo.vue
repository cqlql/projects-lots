<template>
  <div>
    <p>
      <button @click="show">弹消息</button>
    </p>
    <p>
      <button @click="pluginShow">插件方式调用</button>
    </p>
    <Toast ref="vToast"/>
  </div>
</template>

<script>
import Toast from './index'
let count = 0
export default {
  components: {
    Toast
  },
  methods: {
    show () {
      this.$refs.vToast.show('消息来了' + count++)
    },
    pluginShow () {
      this.$toast('插件方式，消息来了' + count++)
    }
  }
}
</script>

<style scoped>
p {
  text-align: center;
}
</style>

