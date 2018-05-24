<template>
  <div>
    <VMask v-show="isShow" @click="cancel" />
    <VTransition name="zoom-out">
      <div class="confirm" v-show="isShow">
        <div class="des">
          <p>{{description}}</p>
        </div>
        <div class="btns">
          <a href="javascript:void(0)" class="btn btn-ca" @click="cancel">取消</a>
          <a href="javascript:void(0)" class="btn btn-co" @click="confirm">确认</a>
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
    confirm () {
      if (this.onConfirm() !== false) {
        this.isShow = false
      }
    },
    cancel () {
      if (this.onCancel() !== false) {
        this.isShow = false
      }
    },
    show ({ description = '确定咩？', onConfirm = function () { }, onCancel = function () { } } = {}) {
      this.isShow = true
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
  width: 320px;
  border-radius: 5px;
  font-size: 18px;

  position: fixed;
  display: table;
  z-index: 99;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #fff;
  text-align: center;
}
.des {
  line-height: 30px;
  padding: 38px 50px 32px;
}
.btns {
  border-top: 1px solid #ccc;
  display: flex;
  width: 100%;
}
.btn {
  color: #3cc51f;
  padding: 20px 0;
  flex: 1;
  text-align: center;
  text-decoration: none;
}
.btn:hover {
  background-color: #f5f5f5;
}
.btn:active {
  background-color: #eee;
}
.btn-ca {
  color: #353535;
  border-right: 1px solid #ccc;
}
</style>
