<template>
  <div>
    <p>
      <LabelSwitch :checked.sync="myChecked"></LabelSwitch>
    </p>
    <p>当前选择：{{myChecked}}</p>
    <p>
      <a @click="myChecked=!myChecked">编程更改</a>
    </p>
  </div>
</template>

<script>
  import LabelSwitch from './LabelSwitch'
  export default {
    data () {
      return {
        myChecked: true
      }
    },
    components: {
      LabelSwitch
    }
  }
</script>

<style scoped>
  p{
    padding: 10px;
  }
a{
  color: blue;
  text-decoration: underline;
}
</style>
