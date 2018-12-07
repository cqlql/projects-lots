import Vue from 'vue'
const vm = new Vue({
  data: {
    activeIndex: 0,
    zIndexMax: 0,
    core: {
      edit: true,

      // 当前容器 / 实际容器(1080 * 1920)
      // 如果当前为 540，那么 scale 为 0.5
      scale: 1,

      background: {
        image: '//www.baidu.com/img/baidu_jgylogo3.gif'
      },
      controls: [{
        // 1 图片; 2 幻灯片; 3 文本； 4 滚动文本； 5 视频
        type: 1,

        x: 200,
        y: 100,
        w: 200,
        h: 100,

        image: 'http://e.hiphotos.baidu.com/image/pic/item/00e93901213fb80e670701903bd12f2eb83894a6.jpg',
        zIndex: 10
      },
      {
        // 幻灯片
        type: 2,

        x: 0,
        y: 0,
        w: 100,
        h: 100,
        images: [
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2142748845,2701567712&fm=26&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3320216634,2881601123&fm=26&gp=0.jpg'
        ],
        zIndex: 11
      },
      {
        // 普通文本
        type: 3,

        x: 0,
        y: 0,
        w: 100,
        h: 100,
        text: '<p>We are delighted to welcome you to the annual <em>Flavorful Tuscany Meetup</em> and hope you will enjoy the programme as well as your stay at the <a href="http://ckeditor.com">Bilancino Hotel</a>.</p>',
        zIndex: 1
      },
      {
        // 滚动文本
        type: 4,

        x: 0,
        y: 0,
        w: 100,
        h: 100,
        text: '<p>We are delighted to welcome you to the annual <em>Flavorful Tuscany Meetup</em> and hope you will enjoy the programme as well as your stay at the <a href="http://ckeditor.com">Bilancino Hotel</a>.</p>',
        zIndex: 8
      },
      {
        // 视频
        type: 5,

        x: 0,
        y: 0,
        w: 100,
        h: 100,
        video: 'http://101.227.211.75/697AE1C8ACC3C83603D50F4A04/0300080200543B5898EEE4020DB1BF6F3507BB-011F-27AE-CE2E-0641C53DFC2D.mp4?ccode=0501&duration=308&expire=18000&psid=2d9afa6d6592fc72fc6ad7d00d904527&ups_client_netip=3d8dfcde&ups_ts=1544082611&ups_userid=&utid=A94kE%2FOHaTACAdoSp%2F5GVXZN&vid=XODAyNDUyMzc2&vkey=Ae1aa525bef35b420b129c8f7db07bbe1&sp=',
        zIndex: 2
      }
      ]
    }
  },
  computed: {
    controls () {
      return this.core.controls
    },
    currActiveItem () {
      return this.controls[this.activeIndex]
    }
  },
  created () {
    this.zIndexMaxInit()
  },
  methods: {
    addImageControl () {
      this.core.controls.push({
        // 1 图片; 2 幻灯片; 3 文本； 4 滚动文本； 5 视频
        type: 1,

        x: 200,
        y: 100,
        w: 500,
        h: 200,

        image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2142748845,2701567712&fm=26&gp=0.jpg',
        zIndex: ++this.zIndexMax
      })
    },
    // 重置 zIndex，避免过大
    zIndexReset () {
      const { controls } = this.core
      controls.sort(function (v1, v2) {
        return v1.zIndex - v2.zIndex // 升序：小 -> 大
      })
      controls.forEach((d, i) => {
        d.zIndex = i
      })
    },
    // 根据 zIndex 初始最大的 zIndex
    zIndexMaxInit () {
      let max = 0
      this.controls.forEach(d => {
        if (d.zIndex > max) max = d.zIndex
      })
      this.zIndexMax = max
    },
    addVideoControl () {},
    activeItem (index) {
      this.activeIndex = index
      this.controls[index].zIndex = ++this.zIndexMax
    }
  }
})
export default vm
