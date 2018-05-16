<template>
  <button class="b-btn" :class="[s?'b-'+s:'']">
    <slot/>
  </button>
</template>
<script>
export default {
  props: {
    s: String
  }
}
</script>

<style scoped>
.b-btn {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  color: #fff;
  padding-top: 6px;
  height: 40px;
  border-radius: 30px;
  width: 100%;
  outline: none;
  position: relative;

  background-color: #f8ac59;
  border-color: #f8ac59;

  box-shadow: inset 0px 0px 0px #f79d3c, 0px 5px 0px 0px #f79d3c,
    0px 9px 25px #bbbbbb;
  &:active {
    background-color: #f7a54a;
    border-color: #f7a54a;
    color: #FFFFFF;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
    text-decoration: none;
    top: 3px;
    box-shadow: inset 0px 0px 0px #f79d3c, 0px 2px 0px 0px #f79d3c, 0px 5px 3px #999999;
  }
}
</style>


