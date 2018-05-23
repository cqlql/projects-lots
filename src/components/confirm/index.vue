<template>
  <div>
    <VMask v-show="isShow" @click="$onCancel"/>
    <VTransition :name="isShow?'zoom-in':'zoom-out'">
    <div class="confirm" v-show="isShow">
      <div class="hd">
        <strong class="tit">操作提示</strong>
      </div>
      <div class="bd">
        <p>{{description}}</p>
      </div>
      <div class="ft">
        <a href="javascript:void(0)" class="btn cc" @click="$onCancel">取消</a>
        <a href="javascript:void(0)" class="btn cur" @click="$onConfirm">确定</a>
      </div>
    </div>
    </VTransition>
  </div>

</template>

<script>
import VMask from '@/components/base/VMask'
import VTransition from '../v-transition'
export default {
  data () {
    return {
      isShow: false,
      description: ''
    }
  },
  methods: {
    $onConfirm () {
      if (this.onConfirm() !== false) {
        this.isShow = false
      }
    },
    $onCancel () {
      if (this.onCancel() !== false) {
        this.isShow = false
      }
    },
    show ({description = '确定咩？', onConfirm = function () {}, onCancel = function () {}} = {}) {
      this.isShow = true
      this.description = description
      this.description = description
      this.onConfirm = onConfirm
      this.onCancel = onCancel
    }
  },
  components: {
    VMask,
    VTransition
  }
}
</script>


<style scoped>
.confirm {
  position: fixed;
  display: table;
  z-index: 99;
  width: 300px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #fff;
  text-align: center;
  border-radius: 3px;
  /* overflow: hidden; */
}
.hd {
  padding: 20px 25px 8px;

}
.tit {
  font-weight: 400;
  font-size: 18px;
}
.bd {
  padding: 0 24px 12px;
    min-height: 40px;
  font-size: 15px;
  line-height: 1.3;
  word-wrap: break-word;
  word-break: break-all;
  color: #999;
}
.ft {
  position: relative;
  line-height: 48px;
  font-size: 18px;
  display: flex;
  border-top: 1px solid #d5d5d6;
}
.btn {
  display: block;
  flex: 1;
  color: #3cc51f;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
}
.btn:hover {
  background-color: #f5f5f5;
}
.btn:active {
  background-color: #eee;
}
.cc {
  color: #353535;
  border-right: 1px solid #d5d5d6;
}

</style>
