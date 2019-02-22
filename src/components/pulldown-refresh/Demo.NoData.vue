<template>
  <div>
    <ArrowTextBtn class="arrow-btn" type="full" :arrow="isShowListSelect?'up':''" @click="showListSelect">三年级 9班 全部</ArrowTextBtn>
    <PulldownRefresh :min-height="containerMinHeight" :no-data="noData" @reload="refreshLoad">
      <!-- <ul>
        <li class="item">
          <div class="ava">
            <img src="./ava-no.png">
          </div>
          <div class="des">
            <p class="row"><span class="name">姓名：张晓峰</span> <button :class="[btnStyleWhite,'btn']">重拍</button></p>
            <p class="row ot">学号：201900125</p>
            <p class="row ot">班级：三年级 5班</p>
          </div>
        </li>
        <li class="item">
          <div class="ava">
            <img src>
          </div>
          <div class="des">
            <p class="row"><span class="name">姓名：张晓峰</span> <button :class="[btnStyle, 'btn']">拍摄</button></p>
            <p class="row ot">学号：201900125</p>
            <p class="row ot">班级：三年级 5班</p>
          </div>
        </li>
      </ul> -->
    </PulldownRefresh>
  </div>
</template>

<script>
import ArrowTextBtn from '@/components/buttons/ArrowTextBtn.vue'
import PulldownRefresh from '@/components/pulldown-refresh/index.vue'
export default {
  components: {
    ArrowTextBtn,
    PulldownRefresh
  },
  data () {
    return {
      noData: true,
      containerMinHeight: window.innerHeight - 50,
      isShowListSelect: false
    }
  },
  methods: {
    refreshLoad (complete) {
      setTimeout(() => {
        complete(1)
      }, 300)
    },
    showListSelect () {
      this.isShowListSelect = !this.isShowListSelect
    }
  }
}
</script>

<style scoped>
.arrow-btn {
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  background-color: #fff;
}
</style>
