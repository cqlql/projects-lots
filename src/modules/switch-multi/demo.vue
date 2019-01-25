<template>
  <div id="app">
    <div class="box">
      <SwitchMulti
        ref="vSwitchMulti"
        :active="$style.transitionActive"
        :left-enter="$style['rightHide'+type]"
        :right-leave-to="$style['rightHide'+type]"
        :right-enter="$style['leftHide'+type]"
        :left-leave-to="$style['leftHide'+type]"
        :no-clear="/so\-item/"
      >
        <div v-for="item of list" :key="item.name" class="so-item">
          <img :src="item" alt>
        </div>
      </SwitchMulti>
    </div>

    <button @click="switchLeft">左切换</button>
    <button @click="switchRight">右切换</button>
    <button @click="()=>switchTo(0)">1</button>
    <button @click="()=>switchTo(1)">2</button>
    <button @click="()=>switchTo(2)">3</button>
    <select v-model="type">
      <option value="0">移动</option>
      <option value="1">缩放+移动</option>
      <option value="2">缩放</option>
      <option value="3">渐变</option>
    </select>
  </div>
</template>

<script>
/**
   * transitionendOnce 有待改造，支持 switch(index)
   */
// import SwitchMulti from '@/modules/switch-multi'
import SwitchMulti from './SwitchMulti'
import SwitchBase from './switch-base.js'
export default {
  components: {
    SwitchMulti
  },
  data () {
    return {
      type: '0',
      list: [
        'https://m.360buyimg.com/babel/jfs/t1/19506/35/6071/100337/5c471f82E224430bc/89fd13918300c679.jpg',
        'https://m.360buyimg.com/babel/jfs/t1/23665/18/4191/66665/5c2f3ebdE5e9c334a/fe52db56cc5e280c.jpg',
        'https://img1.360buyimg.com/pop/jfs/t1/11211/7/6211/68507/5c3dafe5Ed32fd245/a825c583fdc01580.jpg'
      ]
    }
  },
  created () {
    this.switchBase = new SwitchBase(this.list.length)
  },
  methods: {
    switchLeft () {
      this.$refs.vSwitchMulti.switchLeft()
    },
    switchRight () {
      this.$refs.vSwitchMulti.switchRight()
    },
    switchTo (i) {
      this.$refs.vSwitchMulti.switch(i)
    }
  }
}
</script>

<style module>
/* .transitionActive {
  transition: 0.3s ease;
  transition-property: opacity, transform;
} */
.rightHide1 {
  transform: translateX(100%) scale(0.8);
  opacity: 0;
}
.leftHide1 {
  transform: translateX(-100%) scale(0.8);
  opacity: 0;
}

.rightHide2 {
  transform: scale(0.5);
  opacity: 0;
}
.leftHide2 {
  transform: scale(1.5);
  opacity: 0;
}
.rightHide3,
.leftHide3 {
  opacity: 0;
}

</style>

<style scoped>
.box {
  border: 2px solid #000;

  width: 590px;
  height: 470px;

  /* &>>>.t-active{
    transition: 0.3s cubic-bezier(.55,0,.1,1);
    transition-property:opacity,transform;
  }
  &>>>.zoom-in-enter,&>>>.zoom-out-leave-to {
  transform: translate3d(100%, 0, 0);
  }
  &>>>.zoom-in-leave-to,&>>>.zoom-out-enter {
    transform: translate3d(-100%, 0, 0);
  } */
}
.so-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
