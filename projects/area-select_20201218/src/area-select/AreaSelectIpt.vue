<template>
  <div class="a-ipt">
    <input class="ipt" readonly :value="names" placeholder="请选择" @click="click">
    <!-- <el-input :value="names" readonly placeholder="请选择" @click.native="click" /> -->
    <div class="a-select">
      <keep-alive>
        <AreaSelectBase v-if="show" class="a-list" :get="get" :loading="loading" @change="change" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import OutsideClose from '@/utils/corejs/dom/outside-close.js'
import AreaSelectBase from './AreaSelectBase'
export default {
  components: { AreaSelectBase },
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    value: {
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
      names: ''
    }
  },
  mounted () {
    // 点外面关闭
    // 用最外层可能会有一块空白区域，所以用了独立的子元素区别里外
    // 但由于 AreaSelectBase 用了 v-if，所以无法初始绑定，才增加了 a-select
    this.outsideClose = new OutsideClose(this.$el.children, () => {
      this.show = false
    })
  },
  destroyed () {
    this.outsideClose.off()
  },
  methods: {
    toggle () { this.show = !this.show },
    hide () { this.show = false },
    click () { this.toggle() },
    change (values) {
      this.names = values.names
      if (values.max) {
        this.hide()
      }
      this.$emit('change', values)
    }
  }
}
</script>

<style scoped>
.a-ipt {
  width: 100%;
}
/* .ipt {
  height: 38px;
  width: 100%;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #606266;
  padding: 0 15px;
  line-height: 36px;
  outline: none;
} */
.a-select {
  position: relative;

}
.a-list {
  position:absolute;
  top: -1px;
  z-index: 1;
  background-color: #fff;
  width: 360px;
}
</style>
