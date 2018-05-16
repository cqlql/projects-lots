<template>
  <div>
    <IconUser class="icon"/>
    <IconPassword class="icon"/>
  </div>
</template>

<script>
import IconUser from '@/components/ico/User'
import IconPassword from '@/components/ico/Password'
export default {
  components: {
    IconUser,
    IconPassword
  }
}
</script>

<style scoped>
.icon {
  width: 28px;
  height: 30px;
  color: #0ace82;
}
</style>
