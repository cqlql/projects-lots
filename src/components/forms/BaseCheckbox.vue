<template>
  <label><input class="cb" type="checkbox" @change="$emit('change',$event, $event.target.checked)" :checked.prop="checked"/><span class="lbt"><slot/></span></label>
</template>

<script>
export default {
  props: {
    checked: Boolean
  }
}
</script>

<style scoped>
.cb {
vertical-align: middle;
}
.lbt {
  vertical-align: middle;
}
</style>
