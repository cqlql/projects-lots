<template>
<div>
  <button @click="play">播放</button>
</div>
</template>

<script>
  import AudioPlay from './audio-play.js'
  export default {
    name: 'deom',
    created () {
      this.audioPlay = new AudioPlay()
    },
    methods: {
      play () {
        this.audioPlay.play('./小熊舞曲.mp3')
      }
    }
  }
</script>

<style scoped>

</style>
