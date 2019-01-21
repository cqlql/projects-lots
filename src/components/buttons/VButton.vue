
<template>
  <button :class="[$style.btn, $style[s]]" @click="$emit('click')"><slot /></button>
</template>
<script>
export default {
  props: {
    s: {
      type: String,
      default: ''
    }
  }
}
</script>

<style module>
.btn {
  color: #fff;
  border: 1px solid #88b8f8;
  background-color: #88b8f8;
  padding: 0 36px;
  height: 30px;
  border-radius: 3px;
  line-height: 1;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;

  &:active {
    border-color: #76b1ff;
    background-color: #76b1ff;
    color: #0054c5;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
    text-decoration: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}

.white {
  border-color: #afafaf;
  background-color: #fff;
  color: #afafaf;
  &:active {
    border-color: #afafaf;
    background-color: #f9f9f9;
    color: #afafaf;
  }
}
.green {
  background-color: #387a09;
  &:active {
    background-color: #17a789;
    color: #02614d;
  }
}
.red {
  background-color: #ed5564;
  &:active {
    background-color: #ea4556;
    color: #8c3039;
  }
}
.gray {
  background-color: #a6a6a6;
  &:active {
    background-color: #9e9e9e;
    color: #464646;
  }
}
</style>
