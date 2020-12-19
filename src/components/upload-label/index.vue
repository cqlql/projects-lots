<template>
  <span class="upload-label">
    <span v-show="status===0">
      <a href="javascript:;" @click="add">{{ addBtnText }}</a>
    </span>
    <span v-show="status===1">
      {{ progressText }}<a href="javascript:;" @click="abortUpload">终止</a>
    </span>
    <span v-show="status===2">
      <span class="name">{{ fileData && fileData.name }}</span><a href="javascript:;" @click="add">重新选择</a><a href="javascript:;" @click="del">删除</a>
    </span>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import fileSelect from '@/libs/corejs/file/file-select'
import { UploadOptions, UploadResult } from './types'
import UploadLabelDemo from './demo/index.vue'

interface FileData {
  url: string
  name: string
}

@Component
export default class UploadLabel extends Vue {
  @Prop({ default: null }) readonly fileData!: FileData
  @Prop() readonly upload!: (options: UploadOptions) => UploadResult
  @Prop({ default: '*' }) readonly accept!: string
  @Prop({ default: '选择文件' }) readonly addBtnText!: string

  // status = 2
  progressText = ''

  get status () {
    if (this.progressText) {
      return 1
    }
    if (this.fileData === null) {
      return 0
    }
    return 2
  }

  abortUpload (e: Event) {}
  async add () {
    if (this.progressText) return
    let file = await fileSelect.file({
      accept: this.accept
    })
    this.progressText = '0%'
    await this.excuUpload(file)
    this.progressText = ''
  }
  del () {
    this.$emit('update:fileData', null)
    this.$emit('change', null)
  }
  async excuUpload (file: File) {
    try {
      let { url } = await this.upload({
        file,
        onProgress: (p: number) => {
          this.progressText = ~~(p * 100 - 1) + '%'
        },
        cancelToken: (abortUpload: () => void) => {
          this.abortUpload = (e: Event) => {
            e.stopPropagation()
            abortUpload()
          }
        }
      })
      this.$emit('update:fileData', {
        name: file.name,
        url
      })
      this.$emit('change', {
        name: file.name,
        url
      })
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
a {
  /* display: inline-block; */
  color: #25a2c7;
  margin: 0 2px;
  vertical-align: middle;
}
.name {
  display: inline-block;
  max-width:60px;
  vertical-align: middle;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
