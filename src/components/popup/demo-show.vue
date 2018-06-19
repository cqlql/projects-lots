<template>
<div>
  <p>
    <Popup ref="vPopup" initIsShow>
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
  mounted () {
    this.$refs.vPopup.show()
  },
  components: {
    Popup
  }
}
</script>
