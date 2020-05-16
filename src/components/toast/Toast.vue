<template>
  <div :class="[$style.toast, $style[options.position], $style[options.type]]">
    <div :class="$style.tickIcon">
      <svg viewBox="0 0 1024 1024">
        <path d="M962 237.778l-585 630-315-405 115.313-98.438 199.688 208.125 495-424.688 90 90z" fill="currentColor"></path>
      </svg>
    </div>
    <div>
      <ErrorIcon :class="$style.errorIcon"/>
      <span :class="$style.txt">{{options.text}}</span>
    </div>
  </div>
</template>

<script>
import ErrorIcon from './ErrorIcon'
export default {
  components: {
    ErrorIcon
  },
  props: {
    options: {
      type: Object,
      default () {
        return {
          type: '',
          text: '',
          position: 'bottom'
        }
      }
    }
  }
}
</script>

<style module>
.toast {
  position: fixed;
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
.success {
  max-width: 120px;
  padding: 14px;
}
.success .tickIcon {
  display: block;
}
.error {
  color: #fff;
  background-color: #eb3941;
  font-size: 14px;
  text-align: left;
}

.toast .errorIcon{
  display: none;
}
.error .errorIcon {
  display: inline-block;
}

/* 位置弹出 */
.bottom {
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
}
.center {
  left: 50%;
  bottom: auto;
  top: 50%;
  transform: translate(-50%, -50%);
}
.top-side {
  left: 0;
  right: 0;
  top:0;
  bottom: auto;
  max-width: none;
  border-radius: 0;
}
.bottom-side {
  left: 0;
  right: 0;
  top:auto;
  bottom: 0;
  max-width: none;
  border-radius: 0;
}
</style>
