<template>
  <div :class="$style.msg" v-if="isShow">
    <i :class="$style.close" @click="hide"></i>
    <p v-for="(msg,i) of msgList" :key="i">
      <TreeView :data="msg" :options="{rootObjectKey:'log', modifiable: false}"/>
    </p>

  </div>
</template>

<script>
import TreeView from './TreeView.vue'
export default {
  components: {TreeView},
  data () {
    return {
      isShow: false,
      msgList: []
    }
  },
  methods: {
    show () {
      this.isShow = true;
      [].forEach.call(arguments, d => {
        this.msgList.push(d)
      })
      // this.msgList.push([].join.call(arguments, ' '))
      this.$nextTick(() => {
        this.$el.scrollTop = this.$el.scrollHeight
      })
    },
    hide () {
      this.isShow = false
      this.msgList = []
    }
  }
}
</script>

<style module>
.msg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  background-color:#fff;
  z-index: 999;
  /* padding: 36px 6px 6px; */
  padding: 6px;
  max-height: 80%;
  overflow: auto;
  box-shadow: 0px 2px 10px 0px #bfbfbf;
  /* pointer-events: none; */
}
.msg :global p{
  margin: 0;
}
.close {
  width: 32px;
  height: 32px;
  background-color: red;
  position: fixed;
  right: 5px;
  top: 5px;
  pointer-events: auto;
}
.close::before,
.close::after {
  content: '';
  width: 80%;
  height: 4px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #fff;
  transform: rotate(45deg)
}
.close::before {
  transform: rotate(-45deg)
}
</style>
