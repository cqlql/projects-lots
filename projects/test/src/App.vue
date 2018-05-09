<template>
<div>
  <p>$bus.userId:{{$bus.userId}}</p>
  <p>$userId:{{$userId}}</p>
  <button @click="test">改变$bus.userId</button>
  <button @click="test2">改变$userId</button>
</div>
</template>

<script>
export default {
  methods: {
    test () {
      this.$bus.userId = 111
    },
    test2 () {
      this.$userId = 222
    }
  }
}
</script>


<style>
.a-box{
  width: 100px;
  height: 100px;
  position: relative;
  left:0;
  background-color: #ddd;
}

</style>
