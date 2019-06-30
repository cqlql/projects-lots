<template>
  <div>
    <p>
      <UploadLabel :upload="upload" :file-data.sync="fileData" />
    </p>
    <p>
      <UploadLabel :upload="upload" :file-data.sync="fileData2" accept="image/*" add-btn-text="选择图片" />
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import UploadLabel, { UploadOptions } from '../index.vue'
import axios from 'axios'
const CancelToken = axios.CancelToken
@Component({
  components: {
    UploadLabel
  }
})
export default class UploadLabelDemo extends Vue {
  fileData = {
    url: 'https://img1.360buyimg.com/pop/s590x470_jfs/t1/80267/39/3240/79645/5d15aeabE022b588f/30d8734e02c1befb.jpg!q90!cc_590x470.webp',
    name: '图片1图片1图片1'
  }
  fileData2 = null
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

<style scoped>
p {
  padding-top: 10px;
}
</style>
