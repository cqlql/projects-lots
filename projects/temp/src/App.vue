<template>
  <div class="s"> temp </div>
</template>

<script>
export default {
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
.s {
  color: red;
  font-size: 20px;
}
</style>
