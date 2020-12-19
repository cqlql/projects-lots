<template>
  <div class="demo">
    <button class="button" @click="go">go</button>
  </div>
</template>

<script>
import ajax from '@/utils/ajax/ajax'
export default {
  methods: {
    go () {
      ajax({
        url: '/user/12345',
        method: 'post',
        params: {
          ID: 12345
        },
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        },
        timeout: 6000
      })
    }
  }
}
</script>

<style scoped>
.demo {
  text-align: center;
  margin: 10px;
}
</style>
