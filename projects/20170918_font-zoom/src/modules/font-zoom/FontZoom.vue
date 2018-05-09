<template>
  <ul>
    <li v-for="d in list">{{d}}</li>
  </ul>
</template>

<script>
  import fontZoom from './font-zoom'
  export default {
    name: 'font-zoom',
    props: ['list'],
    mounted () {
      this.update()
    },
    watch: {
      list () {
        this.update()
      }
    },
    methods: {
      update () {
        this.$nextTick(function () {
          fontZoom(this.$el)
        })
      }
    }
  }
</script>
