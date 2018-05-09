<template>
<div class="turntable">
  <div ref="eDist" class="dist"></div>
  <button @click="start">start</button>
</div>
</template>

<script>
  /* eslint-disable */
  import Turntable from './turntable'
  export default {
    name: 'deom',
    created () {
    },
    mounted () {
      let turntable = this.turntable = new Turntable()
      turntable.init({
        el: this.$refs.eDist,
        complete () {
          console.log('结束')
        }
      })
    },
    methods: {
      start () {
        this.turntable.start()
        this.turntable.stop(1)
      }
    }
  }
</script>

<style scoped lang="postcss">
.turntable {
  padding: 20px;
  .dist {
    width: 200px;
    height: 200px;
    background-color: #ddd;
  }
}

</style>
