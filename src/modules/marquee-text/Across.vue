<template>
  <div class="bottom-message"><div></div></div>
</template>

<script>
  import TextMarquee from './text-marquee'
  export default {
    props: ['html'],
    name: 'text-marquee-across',
    mounted () {
      let {$el: eBox} = this
      let eText = eBox.children[0]
      let textMarquee = this.textMarquee = new TextMarquee({
        eBox,
        eText
      })
      textMarquee.acrossUpdate(this.html || '')
    },
    destroyed () {
      this.textMarquee.destroy()
    },
    watch: {
      html () {
        this.textMarquee.acrossUpdate(this.html)
      }
    }
  }
</script>

<style scoped>
  .bottom-message {
    width: 600px;
    height: 66px;
    color: #fff;
    font-size: 30px;
    background-color: rgba(42, 71, 80, 0.82);
    white-space: nowrap;
    line-height: 2.2;
    overflow: hidden;
    box-sizing: border-box;
    top: 0;
    span {
      padding-left: 10px;
    }
  }
</style>
