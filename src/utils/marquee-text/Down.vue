<template>
  <div class="box">
    <div>
      <div class="b"></div>
    </div>
  </div>
</template>

<script>
  import TextMarquee from './text-marquee'
  export default {
    name: 'text-marquee-down',
    props: ['html'],
    mounted () {
      let {$el: eBox} = this
      let eText = eBox.children[0]
      let textMarquee = this.textMarquee = new TextMarquee({
        eBox,
        eText
      })
      textMarquee.downUpdate(this.html || '')
    },
    destroyed () {
      this.textMarquee.destroy()
    },
    watch: {
      html () {
        this.textMarquee.downUpdate(this.html)
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 300px;
    height: 300px;
    overflow: hidden;
    background-color: #ddd;
    margin-top: 20px;

    .b {
      padding: 20px;
    }
  }
</style>
