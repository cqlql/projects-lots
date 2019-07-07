<template>
  <svg aria-hidden="true"><use :xlink:href="'#'+$style.id"></use></svg>
</template>

<script>
let icoAdd = false
export default {
  created () {
    if (icoAdd) return
    icoAdd = true
    let eTemp = document.createElement('div')

    eTemp.innerHTML = `<svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;"><symbol id="${this.$style.id}" viewBox="0 0 1024 1024"><path d="M960 426.667H597.333V64c0-35.345-28.655-64-64-64h-42.667c-35.345 0-64 28.655-64 64v362.667H64c-35.345 0-64 28.655-64 64v42.667c0 35.345 28.655 64 64 64h362.667V960c0 35.345 28.655 64 64 64h42.667c35.345 0 64-28.655 64-64V597.333H960c35.345 0 64-28.655 64-64v-42.667c0-35.344-28.655-63.999-64-63.999z" fill="currentColor"></path></symbol></svg>`
    document.body.appendChild(eTemp.children[0])
  }
}
</script>

<style module>
.id {width:0}
</style>
