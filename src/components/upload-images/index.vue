<template>
  <div class="upload-images">
    <ul>
      <li class="item">
        <div class="item-cont" @click="add">
          <i v-show="!progressText" class="add-ico" />
          <span v-show="progressText" class="text">{{ progressText }}<a @click="abortUpload">终止</a></span>
        </div>
      </li>
      <li v-for="(item,k) of imageList" :key="k" class="item">
        <div class="item-cont">
          <img class="img" :src="item.url" :alt="item.name">
          <div class="del"><i class="del-ico" /></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import fileSelect from '@/modules/corejs/file/file-select'
interface ImageInfo {
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
@Component
export default class UploadImages extends Vue {
  @Prop({ default: () => [] }) readonly imageList!: ImageInfo[]
  @Prop({ type: [String, Number], default: 20 }) readonly multiple!: string|number // 最大文件数
  @Prop() readonly upload!: (options: UploadOptions) => UploadResult
  progressText = ''
  created () {
    console.log(this.multiple)
  }
  abortUpload (e: Event) {}
  async add () {
    if (this.progressText) return
    let file = await fileSelect.file({
      accept: 'image/*'
    })
    this.progressText = '0%'
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
      this.imageList.push({
        name: file.name,
        url
      })
    } catch (e) {
    }
    this.progressText = ''
  }
}
</script>

<style scoped>
.upload-images {
  /* background: #ddd; */
  width: 590px;
  /* height: 470px; */
  overflow: hidden;
  margin: 0 auto;
}
.text {
  /* width: 20px; */
  /* height: 20px; */
  width: 45px;

  position: absolute;
  display: table;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  font-size: 12px;
}
.text a {
  display: block;
  margin-top: 5px;
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
.add-ico {
  width: 20px;
  height: 20px;

  position: absolute;
  display: table;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHZpZXdCb3g9IjAgMCAxNDE3LjMgMTQxNy4zIj4NCjxwYXRoIGQ9Ik0xMzU0LjUsNjUxLjhsLTU4Mi42LTIuMVY2NC44YzAtMzIuNC0yNi4zLTU4LjctNTguNy01OC43cy01OC44LDI2LjMtNTguOCw1OC43djU4NC41bC01OTEuOC0yLjFoLTAuMg0KCWMtMzIuNCwwLTU4LjYsMjYuMS01OC44LDU4LjZjLTAuMiwzMi40LDI2LjEsNTguOCw1OC41LDU4LjlsNTkyLjIsMi4xdjU4NS45YzAsMzIuNSwyNi4zLDU4LjcsNTguOCw1OC43czU4LjctMjYuMyw1OC43LTU4LjdWNzY3LjINCglsNTgyLjEsMi4xaDAuMmMzMi40LDAsNTguNi0yNi4xLDU4LjgtNTguNkMxNDEzLjEsNjc4LjMsMTM4Ni44LDY1MS45LDEzNTQuNSw2NTEuOEwxMzU0LjUsNjUxLjh6IE0xMzU0LjUsNjUxLjgiLz4NCjwvc3ZnPg0K')
}
.del-ico {
  width: 10px;
  height: 10px;
  display: block;
  background:url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHZpZXdCb3g9IjAgMCAxNDE3LjMgMTQxNy4zIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGQ9Ik0xMjc0LjEsMzQuNkw3MTIuNSw1OTIuM0wxNTAuNiwzMC40Yy0zMS4yLTMxLjItODEuNy0zMS4yLTExMi45LDBjLTMxLjIsMzEuMi0zMS4yLDgxLjcsMCwxMTIuOWw1NjEuNSw1NjEuNUwyOC43LDEyNzEuMg0KCWwtMC4yLDAuMmMtMzEuMSwzMS4xLTMxLjIsODEuNC0wLjIsMTEyLjdjMzEsMzEuMyw4MS41LDMxLjQsMTEyLjgsMC40bDU3MC45LTU2Ni44bDU2Mi44LDU2Mi44YzMxLjIsMzEuMiw4MS43LDMxLjEsMTEyLjksMA0KCWMzMS4yLTMxLjIsMzEuMi04MS43LDAtMTEyLjlMODI1LjMsNzA1LjFsNTYxLjEtNTU3LjJsMC4yLTAuMmMzMS4xLTMxLjEsMzEuMi04MS40LDAuMi0xMTIuN0MxMzU1LjgsMy44LDEzMDUuMywzLjcsMTI3NC4xLDM0LjYNCglMMTI3NC4xLDM0LjZ6IE0xMjc0LjEsMzQuNiIgZmlsbD0iI2ZmZiIvPg0KPC9zdmc+DQo=');
}
.del {
  width: 10px;
  height: 10px;
  padding: 2px;
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  cursor: pointer;
}
.img {
  max-width: 45px;
  max-height: 60px;

  position: absolute;
  display: table;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.item {
  width: 45px;
  height: 60px;
  background-color: #ddd;
  /* border: 2px solid #000; */
  float: left;
  margin: 2px;
}
.item-cont {
  width: 45px;
  height: 60px;
  position: relative;
}
.item-cont .del {
  display: none;
}
.item-cont:hover .del {
  display: block;
}
</style>
