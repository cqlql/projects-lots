<template>
  <div>
    <VMask ref="vMask" zIndex="1" v-show="isShow" @click="isShow=false"/>
    <LeftNavItem ref="vAddItem" :type="type" @inputValue="v=>value=v" :data="data" @select="v=>$emit('select',v)" :selectedId="selectedId" @edit="onEidt" @del="onDel"/>
  </div>
</template>

<script>
import VMask from '@/components/base/VMask'
import LeftNavItem from './LeftNavItem'
import ajaxApi from '@/modules/ajax-api'
export default {
  props: {
    selectedId: Number,
    data: Object,
    index: Number
  },
  data () {
    return {
      isShow: false,
      value: '',
      type: ''
    }
  },
  methods: {
    show () {
      this.isShow = true
      this.$nextTick(() => {
        this.$refs.vAddItem.selectAll()
      })
    },
    onEidt () {
      this.type = 'input'
      this.show()
    },
    onDel () {
      this.$confirm('确定删除？', () => {
        ajaxApi.deletehistorylesson(this.data.id).then(() => {
          this.$emit('del', this.index)
          this.$toast.success('删除成功')
        })
      })
    }
  },
  watch: {
    isShow (isShow) {
      if (!isShow) {
        this.type = ''
        let {value, data} = this
        if (value && value !== data.name) {
          // this.$emit('save', value)
          ajaxApi.modifylessonname({id: data.id, name: value}).then(result => {
            data.name = value
            this.$toast.success('编辑成功')
          })
        }
      }
    }
  },
  components: {
    VMask,
    LeftNavItem
  }
}
</script>

