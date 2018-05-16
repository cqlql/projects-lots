<template>
  <div class="box">
    <p><VButton @click="show=1">显示蒙层</VButton></p>
    <VMask v-if="show" @click="show=0"></VMask>
  </div>
</template>

<script>
import VMask from './VMask'
import VButton from '../buttons/VButton'
export default {
  data () {
    return {
      show: 0
    }
  },
  components: {
    VMask,
    VButton
  }
}
</script>

<style scoped>
.box {
  margin: 10px;
}
</style>
