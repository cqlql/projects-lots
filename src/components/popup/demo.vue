<template>
<div>
  <p>
    <button @click="show">弹出</button>
  </p>
  <!-- <button @click="showNoMask">弹出，不带蒙层</button> -->
  <Popup ref="vPopup">
    <div class="cont">hello</div>
  </Popup>
</div>
</template>

<script>
import Popup from '@/components/popup'
export default {
  methods: {
    show () {
      this.$refs.vPopup.show()
    },
    showNoMask () {
      this.$refs.vPopup.show({
        mask: false
      })
    }
  },
  components: {
    Popup
  }
}
</script>

<style scoped>
p {
  padding: 10px;
  text-align: center;
}
.cont {
  padding: 10px;
}
</style>
