<template>
  <VTransition>
  <div v-show="isShow" :class="[$style.msgSimple, position, type]">
    <div :class="$style.tickIcon">
      <svg viewBox="0 0 1024 1024"><path d="M962 237.778l-585 630-315-405 115.313-98.438 199.688 208.125 495-424.688 90 90z" fill="currentColor"></path></svg>
    </div>
    <div>
      {{text}}
    </div>
    </div>
  </VTransition>
</template>

<script>
import VTransition from '@/components/v-transition'
export default {
  data () {
    return {
      isShow: false,
      type: '',
      text: '',
      position: ''
    }
  },
  methods: {
    show (options) {
      // 参数处理
      let position = 'bottom'
      let type = ''
      if (typeof options === 'object') {
        this.text = options.text
        type = options.type || type

        // 位置处理。成功提醒消息默认居中
        if (type === 'success') {
          position = 'center'
        }
        position = options.position || position
      } else {
        this.text = options
      }
      this.position = this.$style[position]
      this.type = this.$style[type]

      // 显示/自动关闭
      this.isShow = true
      clearTimeout(this.stopId)
      this.stopId = setTimeout(() => { this.isShow = false }, 1200)
    }
  },
  components: {
    VTransition
  }
}
</script>

<style module>
.msgSimple {
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 10px;
  font-size: 16px;
  line-height: 1.2;

  max-width: 86%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  border-radius: 3px;
  z-index: 100;
}
.tickIcon {
  width: 55px;
  margin: 0 auto;
  display: none;
}

.center {
  bottom: 50%;
  transform: translate(-50%, -50%);
}
.success {
  max-width: 120px;
  padding: 14px 10px;
}
.success .tickIcon{
  display: block;
}
</style>
