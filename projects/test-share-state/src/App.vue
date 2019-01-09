<template>
  <div>
    <div class="test">hello word, {{ data }}</div>
    <button @click="onChangeOtherState">改变额外的状态</button>
  </div>
</template>

<script>
import helloState from './hello-state.js'
export default {
  computed: {
    data () {
      return helloState.data
    }
  },
  beforeCreate () {
    helloState.create()
  },
  destroyed () {
    helloState.destroy()
  },
  methods: {
    onChangeOtherState () {
      helloState.data = helloState.data === 'bar' ? 'foo' : 'bar'
    }
  }
}
</script>
