<template>
<div class="box">
  <p>
    <a href="javascript:void(0)" @click="show">一般调用</a>
    <a href="javascript:void(0)" @click="showPlugin">插件调用</a>
  </p>
  <VConfirm ref="vConfirm"/>
</div>
</template>

<script>
import VConfirm from './index'
export default {
  components: {
    VConfirm
  },
  methods: {
    show () {
      this.$refs.vConfirm.show({
        description: '确定删除？',
        onCancel () {
          console.log('已取消')
          // return false // 可阻止关闭
        },
        onConfirm () {
          return false // 可阻止关闭
        }
      })
    },
    showPlugin () {
      this.$confirm('确定删除？', function () {
        console.log('确认')
        return false // 可阻止关闭
      }, function () {
        console.log('取消')
      })
    }
  }
}
</script>

<style scoped>
.box {
  text-align: center;
  font-size: 18px;
}
p {
  padding: 10px 0;
}
</style>
