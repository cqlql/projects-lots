<template>
  <div class="upload-files">
    <ul>
      <li v-for="(item,i,k) of fileList" :key="k" class="item">
        <a class="del" href="javascript:;" @click="del(i)"><IcoDel class="del-ico" /></a>
        <span class="name">{{ item.name }}</span>
      </li>
      <li v-show="fileNum<multiple" class="item">
        <a v-show="!progressText" href="javascript:;" class="add" @click="add">
          <IcoAdd class="add-ico" /><span>增加文件</span>
        </a>
        <span v-show="progressText" class="text">{{ progressText }}<a href="javascript:;" @click="abortUpload">终止</a></span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import fileSelect from '@/libs/corejs/file/file-select'
import IcoAdd from '@/components/ico/Add.vue'
import IcoDel from '@/components/ico/Del.vue'
export interface FileInfo {
  url: string
  name: string
}
export interface UploadResult {
  url: string
}
export interface UploadOptions {
  file: File,
  onProgress: (p: number) => void,
  cancelToken: (abortUpload: () => void) => void
}
@Component({
  components: {
    IcoAdd,
    IcoDel
  }
})
export default class UploadFiles extends Vue {
  @Prop({ default: '*' }) readonly accept!: string
  @Prop({ default: () => [] }) readonly fileList!: FileInfo[]
  @Prop({ type: [String, Number], default: 20 }) readonly multiple!: string|number // 最大文件数
  @Prop() readonly upload!: (options: UploadOptions) => UploadResult

  progressText = ''

  get fileNum () {
    return this.fileList.length
  }

  abortUpload (e: Event) {}
  async add () {
    if (this.progressText) return
    let files = []
    if (this.multiple > 1) {
      files = await fileSelect.files({
        accept: this.accept
      })
    } else {
      files = [await fileSelect.file({
        accept: this.accept
      })]
    }
    this.progressText = '0%'
    for (let index = 0, length = files.length; index < length; index++) {
      if (this.fileNum >= this.multiple) break
      const file = files[index]
      await this.excuUpload(file)
    }
    this.progressText = ''
  }
  del (index: number) {
    this.fileList.splice(index, 1)
    this.$emit('change', this.fileList)
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
      this.fileList.push({
        name: file.name,
        url
      })
      this.$emit('change', this.fileList)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
.upload-files {
}
.text a {
      color: #f52f2f;
}
.add {
  /* width: 20px;
  height: 20px; */

  display: inline-block;
  text-decoration: none;
}
.add-ico {
  width: 20px;
  height: 20px;
  margin-right: 4px;
  vertical-align: middle;
  color: #00b7ee;
}
.add span {
  vertical-align: middle;
  color: #25a2c7;
}
.del-ico {
  width: 20px;
  height: 20px;
  margin-right: 4px;
  color: #f52f2f;
}
.del {
  display: inline-block;
  vertical-align: middle;
}
.name {
  vertical-align: middle;
}
.item {
  padding: 4px;
}
</style>
