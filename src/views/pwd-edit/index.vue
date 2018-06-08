<template>
  <div :class="$style.pwdEdit">
    <button @click="addPwd">增加密码框</button>
    <div :class="$style.edit" contenteditable></div>
  </div>
</template>

<script>
export default {
  methods: {
    addPwd () {}
  }
}
</script>

<style module>
.pwdEdit {
  padding: 10px;
}
.edit {
  border:2px solid #000;
  width: 300px;
  height: 300px;
  padding: 10px;
}
</style>
