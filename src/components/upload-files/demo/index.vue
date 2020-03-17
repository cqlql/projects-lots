<template>
  <div>
    <p>
      <UploadFiles :upload="upload" :file-list="fileList1" />
    </p>
    <p>
      <UploadFiles :upload="upload" :file-list="fileList2" multiple="1" />
    </p>
    <p>
      <UploadFiles :upload="upload" :file-list="fileList3" accept="video/mp4" multiple="3" />
    </p>
  </div>
</template>

<script>
import UploadFiles from '../Index.vue'
import axios from 'axios'
const CancelToken = axios.CancelToken

export default {
  components: {
    UploadFiles
  },
  data () {
    return {
      fileList1: [],
      fileList2: [],
      fileList3: [
        {
          url: 'https://img1.360buyimg.com/pop/s590x470_jfs/t1/80267/39/3240/79645/5d15aeabE022b588f/30d8734e02c1befb.jpg!q90!cc_590x470.webp',
          name: '图片1'
        },
        {
          url: 'https://img1.360buyimg.com/pop/s590x470_jfs/t1/50617/7/3424/99845/5d133006E5eb0a2d4/b921453cd161a1b3.jpg!q90!cc_590x470.webp',
          name: '图片2'
        }
      ]
    }
  },
  methods: {
    async upload ({ file, onProgress, cancelToken }) {
      const fd = new FormData()
      fd.append('file', file)
      const { data } = await axios.post('/UploadImage', fd, {
        baseURL: '/mock',
        onUploadProgress: e => {
          if (e.lengthComputable) {
            onProgress(e.loaded / e.total)
          }
        },
        cancelToken: new CancelToken(cancelToken)
      })

      return {
        url: data.data.Url
      }
    }
  }
}
</script>
