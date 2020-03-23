<template>
  <div class="main">
    <div class="info">{{ info }}</div>
    <div v-for="item in list" ref="vbox" class="v">
      <!-- <video v-if="item.play" :src="item.url" autoplay controls /> -->
      <video muted controls webkit-playsinline="true" playsinline="true" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          url: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/4bb3e4c1242645539656048641/v.f30.mp4?dockingId=09bbf724-4c8c-42d0-9ddb-48b344bbc60b&storageSource=3',
          // play: false
        },
        {
          url: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/3b8151b7287228662741790721/v.f30.mp4?dockingId=2057223e-4188-450d-941e-58f318c22398&storageSource=3',
          // play: false
        },
        {
          url: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/585c0a77143432160991780865/v.f30.mp4?dockingId=eb14199b-3df9-49c5-ada9-6ce262beaaf8&storageSource=3',
          // play: false
        },
        {
          url: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/24b1eb19237173205683953665/v.f30.mp4?dockingId=f0e708eb-1af7-4777-b783-9d5c93081f23&storageSource=3',
          // play: false
        }
      ],
      winLineY: window.innerHeight / 2,
      excuStatus: 0,
      info: '视频滚动位置自动播放'
    }
  },
  created () {

  },
  mounted () {
    const { offsety } = this
    const { vbox } = this.$refs
    this.list.forEach((item, i) => {
      item.y = offsety(vbox[i])
      item.video = vbox[i].firstElementChild
    })
    this.scrollOn()
  },
  destroyed () {
    this.scrollOff()
  },
  methods: {
    scrollEvent () {
      this.excuInterval(() => {
        const { winLineY } = this
        const { pageYOffset } = window
        this.list.forEach((item, i) => {
          const ty = item.y - pageYOffset
          const by = ty + 210
          const video = item.video
          if (ty < winLineY && by > winLineY) {
            item.play = true
            if (!video.src) video.src = item.url
            video.play()
          } else {
            item.play = false
            video.pause()
          }
        })
      })
    },
    offsety (elem) {
      let top = 0

      if (elem === document) {
        return { top }
      }

      do {
        top = top + elem.offsetTop + elem.clientTop

        const pre = elem
        elem = elem.offsetParent
        // 处理对fixed支持。由于fixed元素offsetParent直接就返回null，所以tagName取到的是自身。非fixed元素只有到body后才会返回null
        if (elem === null) {
          if (pre.tagName !== 'BODY') {
            top += window.pageYOffset
          }
          break
        }
      } while (true)

      return top
    },
    scrollOn () {
      window.addEventListener('scroll', this.scrollEvent)
    },
    scrollOff () {
      window.removeEventListener('scroll', this.scrollEvent)
    },
    excuInterval (callBack) {
      if (this.excuStatus) return
      this.excuStatus = 1
      setTimeout(() => {
        callBack()
        this.excuStatus = 0
      }, 300)
    }

  }
}
</script>

<style scoped>
.info {
  position:fixed;
  top: 0;
  color: red;
}
.main {
  padding: 200px 0;
}
.v {
  width: 375px;
  height: 210px;
  background-color: #000;
  margin: 100px 0;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
