<template>
  <svg aria-hidden="true"><use :xlink:href="'#'+$style.id" /></svg>
</template>

<script>
let icoAdd = false
export default {
  created () {
    if (icoAdd) return
    icoAdd = true
    let eTemp = document.createElement('div')
    eTemp.innerHTML = `<svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;"><symbol id="${this.$style.id}" viewBox="0 0 1024 1024"><path d="M710.144 361.408H72.896C32.704 361.6 0.128 395.968 0 438.528v508.352c0.128 42.56 32.704 76.992 72.96 77.12h637.184c40.192-0.128 72.768-34.56 72.96-77.12V438.528c-0.192-42.56-32.768-76.992-72.96-77.12z m10.24 585.472a10.88 10.88 0 0 1-10.24 10.88H72.896a10.88 10.88 0 0 1-10.24-10.88V438.528c0-5.76 4.8-10.88 10.24-10.88h637.248c5.44 0 10.24 5.12 10.24 10.88v508.352z" fill="currentColor" p-id="2651"></path><path d="M1023.488 562.432c-38.784-187.2-178.432-349.312-364.352-423.104a591.744 591.744 0 0 0-240.256-41.728L456.32 57.024a34.432 34.432 0 0 0 7.68-32.832 33.28 33.28 0 0 0-23.808-23.232 32.192 32.192 0 0 0-31.488 9.6L310.208 117.12a34.304 34.304 0 0 0 1.216 47.808l98.496 96a32.192 32.192 0 0 0 46.4-1.344 34.304 34.304 0 0 0-1.28-47.808l-47.936-46.72a528.64 528.64 0 0 1 228.352 37.12c165.504 65.728 289.536 209.088 323.712 374.208a32.896 32.896 0 0 0 38.72 25.152 33.792 33.792 0 0 0 25.6-39.168z" fill="currentColor"></path></symbol></svg>`
    document.body.appendChild(eTemp.children[0])
  }
}
</script>

<style module>
.id {width: 0;}
</style>
