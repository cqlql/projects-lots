<template>
  <div class="cont">
    <MenuTree :list="list" />
  </div>
</template>

<script>
import MenuTree from './Index.vue'
export default {
  components: { MenuTree },
  data () {
    return {
      list: [
        { id: '2365920071', name: 'FormData', children: [] },
        { id: '138148815', name: 'h5 文件上传', children: [] },
        {
          id: '4168336262',
          name: 'h5 文件系统 FileSystem API',
          children: [
            { id: '362986148', name: '文件读取', children: [] },
            { id: '2057100079', name: 'base64', children: [] },
            {
              id: '3886228565',

              name: 'blob 获取',
              children: [
                {
                  id: '1261040296',

                  name: 'atob + Uint8Array 方式 (base64 转 blob)',
                  children: []
                },
                {
                  id: '2355933663',

                  name: 'canvas.toBlob 方式',
                  children: []
                }
              ]
            },
            { id: '2401870561', name: 'blob 转 file', children: [] },
            {
              id: '660441486',

              name: '浏览器直接打开 blob (也可实现下载)',
              children: []
            }
          ]
        },
        { id: '3422879351', name: 'h5 无刷新改变 url', children: [] },
        {
          id: '2921257294',
          name: 'h5 本地存储',
          children: [
            {
              id: '625928606',

              name: 'localStorage/sessionStorage',
              children: []
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.cont {
  width: 200px;
  border: 1px solid #ddd;
  position: relative;
  overflow: auto;
}
</style>
