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
  color: #16c7fc;
  font-size: 12px;
  background-color: transparent;
  padding: 4px 16px;
  display: inline-block;
  line-height: 1;
  outline: none;
  border-radius: 4px;
  border: solid 1px #16c7fc;
  &:active {
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
    text-decoration: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}

.b-green {
  border: 1px solid #1ab394;
  color: #1ab394;
}

.b-red {
  border: 1px solid #ed5564;
  color: #ed5564;
}
.b-gray {
  border: 1px solid #afafaf;
  background-color: #f3f3f4;
  color: #afafaf;
  &:active {
    background-color: #f3f3f4;
    color: #afafaf;
  }
}
</style>


