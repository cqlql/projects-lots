<template>
  <div id="app">
    <div class="box">
      <SwitchOne ref="vSwitchOne" @loadData="loadData">
        <template slot-scope="props">
          <span>hello from parent</span>
          <span>{{ props.data.name }}</span>
        </template>
      </SwitchOne>
    </div>

    <button @click="switchLeft">左切换</button>
    <button @click="switchRight">右切换</button>
  </div>
</template>

<script>
import SwitchOne from '@/modules/switch-one/SwitchOne.vue'
export default {
  components: {
    SwitchOne
  },
  data () {
    return {
      switchIndex: 0,
      switchType: 'right'
    }
  },
  mounted () {
    this.$refs.vSwitchOne.load()
  },
  methods: {
    loadData (succeed) {
      // 模拟 ajax
      setTimeout(function () {
        succeed({
          name: Math.random()
        })
      }, 300)
    },
    switchLeft () {
      this.$refs.vSwitchOne.switchLeft()
    },
    switchRight () {
      this.$refs.vSwitchOne.switchRight()
    }
  }
}
</script>

<style scoped>
.box{
  border: 2px solid #000;

  width: 200px;
  height: 300px;
}

</style>
