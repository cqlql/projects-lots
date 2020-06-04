<template>
  <div>
    <p>
      <button @click="show">普通消息</button>
    </p>
    <p>
      <button @click="showSuccess">成功提醒</button>
    </p>
    <p>
      <button @click="onErrorMsg">错误消息</button>
    </p>
    <p>
    </p>
  </div>
</template>

<script>
import toast from '@/modules/toast'
export default {
  mounted () {
    toast.success('开始~')
  },
  methods: {
    show () {
      toast('消息来了' + ~~(Math.random() * 100))
      // toast.text('消息来了' + ~~(Math.random() * 100))
    },
    showSuccess () {
      toast.success('成功提醒')
    },
    onErrorMsg () {
      toast.error('操作失败操作失败操作失败操作失败操作失败操作失败')
    }
  }
}
</script>

<style scoped>
p {
  text-align: center;
  margin: 5px;
}
</style>
