<template>
  <!-- <span :class="[$style.btn, $style[type]]"><span :class="$style.name"><slot /><i :class="$style.arrow" /></span></span> -->
  <a
    :class="[$style.btn, $style[arrow], $style[type]]"
    href="javascript:void(0);"
    @click="$emit('click')"
  ><slot /><i :class="$style.arrow" /></a>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    arrow: {
      type: String,
      default: ''
    }
  }
}
</script>

<style module>
.btn {
  color: #88b8f8;
  font-size: 16px;
  
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
/* .name {
  display: inline-block;
  margin-right: 10px;
  position: relative;
} */

.arrow {
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 5px 0 5px;
  border-color: #88b8f8 transparent transparent transparent;

  vertical-align: 2px;
  margin-left: 6px;

  /* position: absolute;
  right: 3px;
  top: 20px; */
  transition: transform 0.3s ease;
}

.up .arrow {
  transform: rotate(180deg);
}

.full {
  display: block;
  text-align: center;
  height: 50px;
  line-height: 3;
}
</style>
