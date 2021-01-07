<template>
  <div class="rs-iptcont">
    <input
      ref="eIpt"
      class="rs-ipt"
      readonly
      :value="names||setNames"
      placeholder="请选择"
      @click.stop="click"
    >
    <div class="rs-select">
      <keep-alive ref="VRSBase">
        <RSBase
          v-if="show"
          class="rs-list"
          :get="get"
          :loading="loading"
          :types="types"
          :left="left"
          :top="top"
          @change="change"
          @close="hide"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import RSBase from './RSBase'
export default {
  components: { RSBase },
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    types: {
      // default: () => [],
      type: Array
    },
    // 当前选中的id
    // value: {
    //   default: '',
    //   type: String
    // },
    // 传进来的输入框显示的名称
    setNames: {
      default: '',
      type: String
    },
    get: {
      type: Function,
      default: () => new Promise((resolve, reject) => resolve())
    }
  },
  data () {
    return {
      show: false,
      names: '',
      left: 0,
      top: 0
    }
  },
  // async created () {
  //   this.getNamesById(this.value)
  //   // this.names = await this.getNamesById(this.value)
  // }
  methods: {
    hide () { this.show = false },
    click (e) {
      if ((this.show = !this.show)) {
        const { left, top, height } = e.target.getBoundingClientRect()
        this.left = left
        this.top = top + height - 1
      }
    },
    change (values) {
      this.names = values.names
      if (values.end) {
        this.hide()
      }
      this.$emit('change', values)
    },
    clear () {
      this.names = ''
      const VRSBase = this.$children[0]
      if (VRSBase) {
        VRSBase.clear()
      }
    }
  }
}
</script>

<style scoped>
.rs-iptcont {
  width: 100%;
}
.rs-ipt {
  /* height: 38px; */
  width: 100%;
  font-size: 14px;
  color: #606266;
  padding: 0 15px;
  /* line-height: 36px; */
  outline: none;
  border-radius: 4px;

    border: 1px solid #DCDFE6;
    height: 40px;
    line-height: 40px;
}
/* .rs-ipt:focus {
  border-color: #1890ff;
} */
.rs-select {
  position: relative;

}
.rs-list {
  position:fixed;
  top: -1px;
  z-index: 1;
  background-color: #fff;
  width: 360px;
}
</style>
