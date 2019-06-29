<template>
  <div>
    <p>
      <UploadImages :upload="upload" :image-list="imageList1" />
    </p>
    <p>
      <UploadImages :upload="upload" :image-list="imageList2" multiple="1" />
    </p>
    <p>
      <UploadImages :upload="upload" :image-list="imageList3" multiple="3" />
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import UploadImages, { UploadOptions } from '../index.vue'
import axios from 'axios'
const CancelToken = axios.CancelToken
@Component({
  components: {
    UploadImages
  }
})
export default class UploadImagesDemo extends Vue {
  imageList1 = []
  imageList2 = []
  imageList3 = [
    {
      url: 'https://img1.360buyimg.com/pop/s590x470_jfs/t1/80267/39/3240/79645/5d15aeabE022b588f/30d8734e02c1befb.jpg!q90!cc_590x470.webp',
      name: '图片1'
    },
    {
      url: 'https://img1.360buyimg.com/pop/s590x470_jfs/t1/50617/7/3424/99845/5d133006E5eb0a2d4/b921453cd161a1b3.jpg!q90!cc_590x470.webp',
      name: '图片2'
    }
  ]
  async upload ({ file, onProgress, cancelToken }: UploadOptions) {
    let fd = new FormData()
    fd.append('file', file)
    let { data } = await axios.post('/UploadImage', fd, {
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
</script>
