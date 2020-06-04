<template>
  <div class="text-marquee-down">
    <div class="text-marquee-down-txt"></div>
  </div>
</template>

<script>
  import TextMarquee from './text-marquee'
  export default {
    name: 'text-marquee-down',
    props: ['html', 'perSecMove'],
    mounted () {
      let {$el: eBox} = this
      let eText = eBox.children[0]
      let textMarquee = this.textMarquee = new TextMarquee({
        eBox,
        eText,
        perSecMove: this.perSecMove
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

<!--<style>
  .text-marquee-down {
    border: 3px solid #333;
    width: 300px;
    height: 300px;
    margin-top: 20px;
    overflow: hidden;
    .text-marquee-down-txt {
      padding: 20px;
      color: #f5c32c;
    }
  }
</style>-->
