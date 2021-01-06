<template>
  <RSInput
    ref="VRSInput"
    :types="types"
    :get="getRegionList"
    :loading="loading"
    :set-names="setNames"
    @change="change"
  />
</template>

<script>
import RSInput from './RSInput.vue'
import { reqArea } from './mock-data'
export default {
  components: { RSInput },
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    // 当前选中的id
    value: {
      default: '',
      type: String
    },
    // 传进来的输入框显示的名称
    setNames: {
      default: '',
      type: String
    },
    types: {
      type: Array,
      default: () => ['省', '市', '区']
    }
  },
  data () {
    return {
      // idsStart: 1, // 值为1：表现层级关系的 ids 从索引 1 开始。也就是只要从省开始的id
      rootId: '1',
      loading: false
    }
  },
  // watch: {
  //   setNames (v) {
  //     const VRSInput = this.$refs.VRSInput
  //     if (VRSInput) {
  //       VRSInput.clear()
  //     }
  //   }
  // },
  methods: {
    getRegionList (id = this.rootId) {
      this.loading = true
      return reqArea(id)
        // .then(list => {
        //   console.log(list)
        //   return list.map((item) => {
        //     return {
        //       id: item.area_id,
        //       name: item.area_name,
        //       level: item.area_level,
        //       pid: item.area_pid
        //     }
        //   })
        // })
        .finally(() => { this.loading = false })
    },
    change (values) {
      this.$emit('change', values)
      this.$emit('update', values.id)
    },
    clear () {
      const VRSInput = this.$refs.VRSInput
      if (VRSInput) {
        VRSInput.clear()
      }
    }
  }
}
</script>
