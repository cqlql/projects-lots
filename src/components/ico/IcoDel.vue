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
    eTemp.innerHTML = `<svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;"><symbol id="${this.$style.id}" viewBox="0 0 1024 1024"><path d="M796.782 128.24h-574.08c-52.851 0-95.68 42.824-95.68 95.678v31.893h765.44v-31.893c0.003-52.854-42.824-95.677-95.68-95.677M629.655 64.456l14.077 100.659h-267.98l14.08-100.66h239.823m7.66-63.782H382.167c-26.317 0-50.795 21.305-54.472 47.404l-18.657 133.455c-3.643 26.069 14.92 47.37 41.237 47.37H669.21c26.314 0 44.882-21.301 41.208-47.398L691.76 48.046C688.113 21.978 663.63 0.673 637.315 0.673m175.416 318.92H206.756c-35.07 0-61.2 28.59-58.025 63.534l52.265 574.556c3.146 34.944 34.478 63.532 69.547 63.532h478.398c35.07 0 66.406-28.59 69.55-63.532l52.265-574.556c3.177-34.944-22.958-63.534-58.025-63.534M382.17 893.645h-95.68L254.595 447.16h127.572v446.49-0.005z m191.36 0H445.957V447.16H573.53v446.49-0.005z m159.462 0h-95.677V447.16H764.89l-31.898 446.49v-0.005z" fill="currentColor"></path></symbol></svg>`
    document.body.appendChild(eTemp.children[0])
  }
}
</script>

<style module>
.id {width:0}
</style>
