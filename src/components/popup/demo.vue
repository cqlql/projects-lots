<template>
<div>
  <p>
    <button @click="show">弹出</button>
    <button @click="showNoMask">弹出，不带蒙层</button>
    <Popup ref="vPopup">
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
    </Popup>
  </p>
</div>
</template>

<script>
import Popup from './index'
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
