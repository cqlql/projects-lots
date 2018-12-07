<template>
  <div>
    <VMask ref="vMask" zIndex="1" v-show="isShow" @click="onSave"/>
    <LeftNavItem v-show="isShow" type="input" ref="vAddItem" @inputValue="v=>value=v" @keyupEnter="onSave" @keyupEsc="onKeyupEsc"/>
  </div>
</template>

<script>
import VMask from '@/components/base/VMask'
import LeftNavItem from './LeftNavItem'
export default {
  data () {
    return {
      isShow: false,
      value: ''
    }
  },
  methods: {
    show () {
      this.isShow = true
      this.$nextTick(() => {
        this.$refs.vAddItem.focus()
      })
    },
    // onKeyupEnter () {
    //   this.onSave()
    // },
    onSave () {
      this.isShow = false
      let {value} = this
      if (value) {
        this.$emit('save', value)
        this.clear()
      }
    },
    onKeyupEsc () {
      this.isShow = false
      this.clear()
    },
    clear () {
      this.$refs.vAddItem.clear()
      this.value = ''
    }
  },
  components: {
    VMask,
    LeftNavItem
  }
}
</script>

