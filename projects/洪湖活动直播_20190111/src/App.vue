<template>
  <div :class="$style.box">
    <!-- <video src="http://live.shenduxuetang.com/listen/listen05.m3u8?tdsourcetag=s_pctim_aiomsg" controls/> -->
    <!-- <video src="http://stream2.ahtv.cn/ahgj/fd/live.m3u8"></video> -->
    <div :class="$style.vd">
      <div :class="$style.vdb">
        <div id="liveVideo" :class="$style.vdbc">
          <!-- <video ref="vVideo" controls /> -->
        </div>
        <div v-if="isNone" :class="$style.none" />
      </div>
    </div>
    <div :style="{height:itemHeight+'px'}"><img src="./imgs/1.png"></div>
    <div :style="{height:itemHeight+'px'}"><img src="./imgs/2.png"></div>
    <div v-for="(d,i) of list" :key="i" :style="{height:itemHeight+'px'}"><img :src="d.isShow&&d.src"></div>
  </div>
</template>

<script>
/* eslint-disable comma-dangle */
import scriptLoad from '@/modules/corejs/dom/script-load.js'
export default {
  data () {
    return {
      // windowHeight: 0,
      itemHeight: 400,
      showNum: 0,
      isNone: false,
      list: [
        // {
        //   isShow: true,
        //   src: 'imgs/1.png'
        // },
        // {
        //   isShow: true,
        //   src: 'imgs/2.png'
        // },
        {
          isShow: false,
          src: 'imgs/3.png'
        },
        {
          isShow: false,
          src: 'imgs/4.png'
        },
        {
          isShow: false,
          src: 'imgs/5.png'
        },
        {
          isShow: false,
          src: 'imgs/6.png'
        },
        {
          isShow: false,
          src: 'imgs/7.png'
        },
        {
          isShow: false,
          src: 'imgs/8.png'
        },
        {
          isShow: false,
          src: 'imgs/9.png'
        },
        {
          isShow: false,
          src: 'imgs/10.png'
        }
      ]

    }
  },
  computed: {
    count () {
      return this.list.length
    }
  },
  mounted () {
    this.sizeUpdate()
    let loadNum = 0 // 记录加载了多少个
    this.scrollOnUpdate(index => {
      let { count } = this
      for (let i = this.showNum; i--;) {
        let v = index - i
        if (v < 2 || v >= count + 2) continue

        let item = this.list[v - 2]
        if (item.isShow) {
          continue
        }
        item.isShow = true

        // 加载完成解除事件
        loadNum++
        if (loadNum >= count) {
          this.scrollOffUpdate()
        }
      }
    })
    this.loadVideo()
  },
  destroyed () {
    this.scrollOffUpdate()
  },
  methods: {
    sizeUpdate () {
      this.itemHeight = window.innerWidth * (644 / 750)
      this.showNum = Math.ceil(window.innerHeight / this.itemHeight) + 1
    },
    scrollOnUpdate (cb) {
      let onScroll = () => {
        // eslint-disable-next-line standard/no-callback-literal
        cb(Math.ceil((window.pageYOffset + window.innerHeight) / this.itemHeight))
      }
      window.addEventListener('scroll', onScroll)
      this.scrollOffUpdate = function () {
        window.removeEventListener('scroll', onScroll)
      }
      onScroll()

      let onResize = () => {
        this.sizeUpdate()
      }
      window.addEventListener('resize', onResize)
      this.resizeOffUpdate = function () {
        window.removeEventListener('resize', onResize)
      }
    },
    scrollOffUpdate () {},
    resizeOffUpdate () {},
    async loadVideo () {
      if (new Date() <= new Date(2019, 0, 13)) {
        this.isNone = true
        return
      }
      // await scriptLoad('https://cdn.jsdelivr.net/npm/hls.js@latest')
      // /* eslint-disable no-undef */
      // if (Hls.isSupported()) {
      //   let video = this.$refs.vVideo
      //   var hls = new Hls()
      //   hls.loadSource('http://live.shenduxuetang.com/listen/listen05.m3u8')
      //   hls.attachMedia(video)
      //   hls.on(Hls.Events.MANIFEST_PARSED, function () {
      //     video.play()
      //   })
      // }
      await scriptLoad('http://style.shenduxuetang.com/TcPlayer-2.2.1.js')
      var options = {
        m3u8: 'http://live.shenduxuetang.com/listen/listen05.m3u8',
        autoplay: true,
        live: true,
        width: '100%',
        height: '100%',
        wording: {
          2: '现场直播，敬请期待',
          4: '现场直播，敬请期待'
        },
        // controls: 'system',
        // x5_fullscreen: false,
        // systemFullscreen: false,
        // 事件监听
        listener: msg => {
          // console.log('listener',msg);
          if (msg.type === 'error') {
            this.isNone = true
            // window.setTimeout(function () {
            //   player.load() // 进行重连
            // }, 5000)
          }
        }
      }
      // var player = new TcPlayer(this.$refs.vVideo, options)
      // eslint-disable-next-line no-new,no-undef
      new TcPlayer('liveVideo', options)
    }
  }
}
</script>

<style module>
.box {
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.vd {
  width: 100%;
  position: absolute;
  padding: 28% 4.8% 0;
  box-sizing: border-box;
}
.vdb {
  /* padding-top: 55.4%; */
  padding-top: 58%;
  background-color: #000;
  border-radius: 8px;
  position: relative;
  /* overflow: hidden; */
  /* transform: translate(0,0) */
}
.vdbc {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  video {
    width: 100%;
    height: 100%;
  }
}
.none {
  width: 100%;
  height: 100%;
  background: #000 url(./imgs/none.png) no-repeat;
  /* background-size: 60%; */
  background-size: 100% 100%;
  position: absolute;
  top: 0;
}
</style>
