<template>
  <div class="cont">
    <MenuTreeDemo />
  </div>
</template>

<script>
import MenuTreeDemo from './menu-tree/Demo'

export default {
  components: { MenuTreeDemo },
  data () {
    return {
      values: ''
    }
  },
  methods: {
    change (values) {
      this.values = values
    }
  }
}
</script>

<style scoped>
.cont {
  color: red;
  font-size: 20px;
}
</style>
