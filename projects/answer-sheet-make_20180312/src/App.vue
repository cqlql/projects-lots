<template>
  <div>
    <svg ref="svg" viewBox="0 0 120 120">
      <foreignObject width="120" height="120">
        <p style="color:red">各种测试Here is a paragraph that requires word wrap</p>
      </foreignObject>
    </svg>

    <!-- <svg width="1000px" height="100px">
      <text x="10"  y="30">
        <tspan font-size="30" font-weight="bold" fill="red">This is bold and red</tspan>
      </text>
    </svg> -->
    <img ref="img">
    <!-- <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <foreignObject width="200" height="150">
        <p style="color:red">Here is a paragraph that requires word wrap</p>
      </foreignObject>
    </svg> -->
    <!-- <svg ref="svg1" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <text x="10" y="30">
        <tspan font-size="30" font-weight="bold" fill="red">This is bold and red</tspan>
      </text>
    </svg> -->

    <canvas ref="cvs"></canvas>

  </div>
</template>

<script>
export default {
  created () {
  },
  mounted () {
    // console.log(this.$refs.cvs)
    const { cvs, img, svg } = this.$refs
    const ctx = cvs.getContext('2d')
    img.src = 'data:image/svg+xml;charset=utf-8,' + (new XMLSerializer()).serializeToString(svg) // + svg.outerHTML

    console.dir((new XMLSerializer()).serializeToString(svg))
    // console.dir(btoa((new XMLSerializer()).serializeToString(svg)))

    console.dir(svg.outerHTML)
    img.onload = function () {
      ctx.drawImage(img, 0, 0)
    }
  }
}
</script>
<style>
/* p {
  font-size: 12px;
  transform: translateX(110px)

} */
</style>

