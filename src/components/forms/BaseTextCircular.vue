<template>
  <BaseText class="form-control" :type="type" :placeholder="placeholder" />
</template>

<script>
import BaseText from './BaseText'
export default {
  props: {
    placeholder: String,
    type: String
  },
  components: {
    BaseText
  }
}
</script>

<style scoped>
.form-control {
  height: 50px;
  border-radius: 30px;
  box-shadow: 0 5px 25px rgba(12, 12, 12, 0.07);
  padding-left: 20px;
  letter-spacing: 1.3px;
  font-weight: bold;
}
</style>


