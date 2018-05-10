<template>
  <div>
    <button @click="show">显示 loading</button>
    <Loading ref="vLoading"/>
  </div>
</template>

<script>
import Loading from './Index'
export default {
  methods: {
    show () {
      this.$refs.vLoading.show()
    }
  },
  components: {
    Loading
  }
}
</script>
