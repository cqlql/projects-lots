
<template>
  <button class="b-btn" :class="[s?'b-'+s:'']" @click="$emit('click')">
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
  border: 0;
  color: #fff;
  /* font-size: 16px; */
  background-color: #00b7ee;
  padding: 12px 30px;
  border-radius: 100px;
  line-height: 1;
  outline: none;
  /* box-shadow: 0 1px 4px #929292; */

  /* width: 130px;
    height: 45px; */
  box-shadow: 0px 4px 6px 0px rgba(2, 25, 44, 0.21);

  font-size: 18px;

  &:active {
    background-color: #00b0e4;
    color: #007294;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
    text-decoration: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}

.b-green {
  background-color: #387a09;
  &:active {
    background-color: #17a789;
    color: #02614d;
  }
}

.b-red {
  background-color: #ed5564;
  &:active {
    background-color: #ea4556;
    color: #8c3039;
  }
}
.b-gray {
  /* border:1PX solid #afafaf; */
  background-color: #a6a6a6;
  /* padding: 2px 14px; */
  /* color: #afafaf; */
  &:active {
    background-color: #9e9e9e;
    color: #464646;
  }
}
</style>


