
<template>
  <button class="b-btn-full" :class="[s?'b-'+s:'']" @click="$emit('click')"><slot/></button>
</template>
<script>
export default {
  props: {
    s: String
  }
}
</script>

<style scoped>
.b-btn-full {
    border: 0;
    color: #fff;
    font-size: 16px;
    background-color: #6ba2ee;
    padding: 16px 0;
    border-radius: 4px;
    line-height: 1;
    outline: none;
    display: block;
    width: 100%;
  &:active {
    background-color: #6ba2ee;
    color: #0880d7;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
    text-decoration: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}

.b-green {
  background-color: #1ab394;
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
  border:1PX solid #afafaf;
  background-color: #f3f3f4;
  padding: 2px 14px;
  color: #afafaf;
  &:active {
    background-color: #f3f3f4;
    color: #afafaf;
  }
}
</style>


