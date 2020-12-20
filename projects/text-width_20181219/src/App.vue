<template>
  <div>
    <a href="javascript:;" @click="textWidth">获取文本宽度</a> {{w}}
  </div>
</template>

<script>

import textWidth from '@/utils/corejs/dom/text-width.js'
export default {
  data () {
    return {
      w: 0
    }
  },
  methods: {
    textWidth () {
      this.w = textWidth('加油', style => {
        style.fontFamily = 'sans-serif, helvetica'
        style.fontSize = '14px'
      })
    }
  }
}
</script>
