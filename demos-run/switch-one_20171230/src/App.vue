<template>
  <div id="app">
    <div class="box">
      <SwitchOne :showIndex="switchIndex" :switchType="switchType" @loadData="loadData">
        <template slot-scope="props">
          <span>hello from parent</span>
          <span>{{ props.data.name }}</span>
        </template>
      </SwitchOne>
    </div>

    <button @click="switchIndex=!switchIndex*1">切换</button>
    <button @click="switchType=switchType==='left'?'right':'left'">切换类型{{switchType}}</button>
  </div>
</template>

<script>
  import SwitchOne from '@/modules/switch-one/SwitchOne'
  export default {
    data () {
      return {
        switchIndex: 0,
        switchType: 'left'
      }
    },
    components: {
      SwitchOne
    },
    methods: {
      loadData (succeed) {
        // 模拟 ajax
        setTimeout(function () {
          succeed({
            name: Math.random()
          })
        }, 400)
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
