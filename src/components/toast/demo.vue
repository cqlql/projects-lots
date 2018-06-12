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
    <p>
      <button @click="onErrorMsg">错误消息</button>
    </p>
    <p>
      <button @click="onErrorMsgTopSide">错误消息 top-side</button>
    </p>
    <p>
      <button @click="onMsgBottomSide">消息 bottom-side</button>
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
      this.$refs.vToast.text('消息来了' + count++)
    },
    pluginShow () {
      this.$toast('插件方式，消息来了' + count++)
    },
    showSuccess () {
      this.$toast.success('成功提醒')
    },
    onErrorMsg () {
      this.$toast.error('操作失败操作失败操作失败操作失败操作失败操作失败')
    },
    onErrorMsgTopSide () {
      this.$toast.show({
        type: 'error',
        position: 'top-side',
        text: '操作失败操作失败操作失败操作失败操作失败操作失败'
      })
    },
    onMsgBottomSide () {
      this.$toast.show({
        position: 'bottom-side',
        text: '操作失败操作失败操作失败操作失败操作失败操作失败'
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
