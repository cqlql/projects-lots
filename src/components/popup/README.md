
使用示例

```html
<template>
<div>
  <Popup ref="vPopup">
    <div class="cont">hello</div>
  </Popup>
</div>
</template>
<script>
import Popup from '@/components/popup'
export default {
  components: {
    Popup
  },
  methods: {
    show () {
      this.$refs.vPopup.show()
    }
  }
}
</script>

```