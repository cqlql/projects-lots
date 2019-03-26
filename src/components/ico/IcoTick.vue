<template>
  <svg :class="$style.ico"><use :xlink:href="'#'+$style.ico" /></svg>
</template>

<script>
let icoAdd = false
export default {
  created () {
    if (icoAdd) return
    icoAdd = true
    let eTemp = document.createElement('div')
    eTemp.innerHTML = `<svg style="position: absolute; width: 0px; height: 0px; overflow: hidden;"><symbol id="${this.$style.ico}" viewBox="0 0 1024 1024"><path d="M343.163095 870.4l-319.015385-307.2c-31.507692-31.507692-31.507692-78.769231-3.938462-110.276923l0 0c31.507692-31.507692 78.769231-31.507692 110.276923-3.938462l259.938462 252.061538L886.670788 157.538462c27.569231-31.507692 78.769231-35.446154 110.276923-3.938462l0 0c31.507692 27.569231 35.446154 78.769231 3.938462 110.276923L457.37848 866.461538C425.870788 901.907692 374.670788 901.907692 343.163095 870.4z" fill="currentColor"></path></symbol></svg>`
    document.body.appendChild(eTemp.children[0])
  }
}
</script>

<style module>
.ico {
  width: 18px;
  height: 18px;
}
</style>
