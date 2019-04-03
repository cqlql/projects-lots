<template>
  <div>
    hello
  </div>
</template>
<script>
export default {
  async mounted () {
    let el = this.$el
    let { transitionActive, to, to2 } = this.$style
    let { classList } = el
    classList.add(transitionActive)
    el.addEventListener('transitionend', function () {
      console.log('end')
    })

    await this.wait(1)
    classList.add(to)

    await this.wait(100) // 动画 100ms 后删除
    classList.remove(transitionActive)

    await this.wait(1)
    classList.add(transitionActive)

    await this.wait(1)
    classList.add(to2)
  },
  methods: {
    wait (time = 0) {
      return new Promise(resolve => {
        setTimeout(resolve, time)
      })
    }
  }
}
</script>

<style module>
.transitionActive {
  transition: 1s ease;
  transition-property: opacity, transform;
}
.to {
  transform: translateX(50%);
}
.to2 {
  transform: translateX(80%);
}
</style>
