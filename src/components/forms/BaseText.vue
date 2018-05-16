<template>
  <input class="form-control" :type="type" :placeholder="placeholder">
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      defalut: ''
    },
    type: {
      type: String,
      defalut: 'text'
    }
  }
}
</script>

<style scoped>
.form-control {
  background-color: #ffffff;
  border: 1px solid #e5e6e7;
  border-radius: 1px;
  padding: 6px 12px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  color:#767575;
}
.form-control:focus {
    border-color: #0ace82;
    outline: none;
}
.form-control::placeholder {
  color: #b7b6b6;
}
</style>


