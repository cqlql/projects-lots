<template>
  <textarea class="tt" cols="30" rows="10" :value="value" @input="onInput"></textarea>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    onInput (e) {
      this.$emit('inputValue', e.target.value)
    }
  }
}
</script>

<style scoped>
.tt {
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  /* border: 1px solid #0ace82; */
  /* border-radius: 1px; */
  padding: 10px 12px;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
  color: #767575;
  outline: none;

  display: block;
  width: 100%;
  resize: none;
}
.tt:focus {
  border-color: #0ace82;
}
.tt::placeholder {
  color: #b7b6b6;
}
</style>

