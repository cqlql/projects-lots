<template>
  <div id="app">
    <div class="box">
      <SwitchOne :switchState="switchState" :switchType="switchType" @loadData="loadData">
        <template slot-scope="props">
          <span>hello from parent</span>
          <span>{{ props.data.name }}</span>
        </template>
      </SwitchOne>
    </div>

    <button @click="()=>switchState=!switchState">切换</button>
    <button @click="()=>switchType=switchType==='left'?'right':'left'">切换类型{{switchType}}</button>
  </div>
</template>

<script>
  /* eslint-disable */
  import SwitchOne from '@/modules/switch-one/SwitchOne2'
  export default {
    data () {
      return {
        switchState: false,
        switchType: 'left'
      }
    },
    components: {
      SwitchOne
    },
    methods: {
      loadData (succeed) {
        succeed({
          name: Math.random()
        })
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
