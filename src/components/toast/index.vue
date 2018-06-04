<template>
  <VTransition :activeClass="$style.transitionActive">
    <div v-show="isShow" :class="[$style.msgSimple, position, type]">
      <div :class="$style.tickIcon">
        <svg viewBox="0 0 1024 1024">
          <path d="M962 237.778l-585 630-315-405 115.313-98.438 199.688 208.125 495-424.688 90 90z" fill="currentColor"></path>
        </svg>
      </div>
      <div>
        <div :class="$style.errorIcon"></div>
        <span :class="$style.txt">{{msg}}</span>
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
      msg: '',
      position: ''
    }
  },
  methods: {
    show (options) {
      // 参数处理
      let position = 'bottom'
      let type = options.type
      this.msg = options.text
      if (/success|error/.test(type)) position = 'center'// 位置处理。部分类型默认居中
      position = options.position || position
      this.position = this.$style[position]
      this.type = this.$style[type]

      // 显示/自动关闭
      this.isShow = true
      clearTimeout(this.stopId)
      this.stopId = setTimeout(() => { this.isShow = false }, 1600)
    },
    text (text) {
      this.show({
        text
      })
    },
    success (text) {
      this.show({
        type: 'success',
        text
      })
    },
    error (text) {
      this.show({
        type: 'error',
        text
      })
    }

  },
  components: {
    VTransition
  }
}
</script>

<style module>
.transitionActive {
  transition: 0.2s ease;
  transition-property: opacity;
}
.msgSimple {
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4px 10px 6px;
  font-size: 16px;
  line-height: 1.2;

  max-width: 86%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  border-radius: 3px;
  z-index: 100;
  /* pointer-events: none; */
}
.txt {
  vertical-align: middle;
}
.tickIcon {
  width: 55px;
  margin: 0 auto;
  display: none;
}

.center {
  bottom: auto;
  top: 50%;
  transform: translateX(-50%, -50%);
}
.success {
  max-width: 120px;
  padding: 14px;
}
.success .tickIcon {
  display: block;
}

.error {
  color: #eb3941;
  border: 2px solid #eb3941;
  background-color: rgba(255, 255, 255);
  font-size: 14px;
  text-align: left;
}
.errorIcon {
  width: 15px;
  height: 15px;
  position: relative;
  background-color: #eb3941;
  border-radius: 100%;

  margin-top: 1px;
  vertical-align: middle;
  /* vertical-align: bottom; */

  display: none;
  /* display: inline-block; */
}
.error .errorIcon {
  display: inline-block;
}
.errorIcon::before,
.errorIcon::after {
  content: "";
  width: 70%;
  height: 10%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #fff;
  transform: rotate(45deg);
}
.errorIcon::after {
  transform: rotate(-45deg);
}
</style>
