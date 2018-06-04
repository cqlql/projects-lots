<template>
  <div>
    <p>
      <button @click="show">弹消息</button>
    </p>
    <p>
      <button @click="pluginShow">插件方式调用</button>
    </p>
    <p>
      <button @click="showSuccess">成功提醒</button>
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
    },
    showSuccess () {
      this.$toast({
        type: 'success',
        text: '成功提醒'
      })
    }
  }
}
</script>

<style scoped>
p {
  text-align: center;
}
</style>

