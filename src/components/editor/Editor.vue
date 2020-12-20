<template>
  <div class="rich-editor ck-content" contenteditable />
</template>

<script>
/* global CKEDITOR */
import scriptLoad from '@/utils/corejs/load/script-load'
import LoadOnce from '@/utils/corejs/load-once'
import fileUpload from '@/api/file-upload'
const ckeditorLoadOnce = new LoadOnce()
export default {
  model: {
    prop: 'value',
    event: 'inputValue'
  },
  props: {
    value: {
      default: ''
    }
  },
  mounted () {
    ckeditorLoadOnce.load(async () => {
      await scriptLoad('//cdn.jsdelivr.net/npm/ckeditor4/ckeditor.js')

      CKEDITOR.disableAutoInline = true

      // 重写 cloudservices，实现定制上传
      CKEDITOR.plugins.add('cloudservices', {
        requires: 'filetools,ajax',
        onLoad: function () {
          var FileLoader = CKEDITOR.fileTools.fileLoader

          function CloudServicesLoader (editor, fileOrData, fileName) {
            FileLoader.call(this, editor, fileOrData, fileName)
          }

          CloudServicesLoader.prototype = CKEDITOR.tools.extend({}, FileLoader.prototype)

          CloudServicesLoader.prototype.upload = function () {
            fileUpload(this.file).then(result => {
              this.responseData = {
                response: { default: result.url }
              }
              this.fire('uploaded')
            })
          }

          CKEDITOR.plugins.cloudservices = {
            cloudServicesLoader: CloudServicesLoader
          }
        }
      })

      return CKEDITOR
    }).then((CKEDITOR) => {
      let sizes = ''
      for (let index = 12; index < 100;) {
        sizes += `${index}/${index}px;`
        index += 2
      }
      // const editor = CKEDITOR.inline(this.$el, {
      const editor = CKEDITOR.replace(this.$el, {
        customConfig: '', // 不加载 config.js
        // filebrowserUploadUrl: 'admin/common/comdocuments/upload.html?javax.faces.partial.ajax=true',
        fontSize_sizes: sizes,
        font_names: '宋体/宋体, SimSun;' +
          '微软雅黑/微软雅黑, Microsoft YaHei;' +
          '楷体/楷体, 楷体_GB2312, SimKai;' +
          '黑体/黑体, SimHei;' +
          '隶书/隶书, SimLi;' +
          'Consolas/Consolas, Courier New, monospace;' +
          'arial black/arial black, avant garde;' +
          'Arial/Arial, Helvetica, sans-serif;' +
          'Times New Roman/Times New Roman, Times, serif;' +
          'Verdana',
        toolbar: [
          { name: 'document', items: ['Source', '-', 'Preview'] },
          { name: 'clipboard', items: ['PasteText', 'PasteFromWord'] },
          { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll'] },
          { name: 'insert', items: ['EasyImageUpload', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
          { name: 'links', items: ['Link', 'Unlink'] },
          // '/',
          { name: 'basicstyles', items: ['Bold', 'Italic', '-', 'CopyFormatting', 'RemoveFormat'] },
          { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
          '/',
          { name: 'colors', items: ['TextColor', 'BGColor'] },
          { name: 'styles', items: ['Format', 'Font', 'FontSize', 'Styles'] },
          { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
        ],
        extraPlugins: 'colorbutton,font,justify,autogrow,easyimage',
        autoGrow_minHeight: 200,
        autoGrow_maxHeight: 600,
        autoGrow_bottomSpace: 20
      })

      // 部分组件语言只有en，因为用的第三方固定的cdn，无法新增，所以临时这样设置
      editor.on('langLoaded', () => {
        editor.lang.easyimage = {
          commands: {
            fullImage: '全尺寸',
            sideImage: '侧边',
            altText: '编辑图片说明',
            upload: '上传图片'
          },
          uploadFailed: '图片上传失败'
        }
        editor.lang.imagebase = {
          captionPlaceholder: '输入图片标题'
        }
      })

      this.editor = editor
      editor.setData(this.value)

      editor.on('change', () => {
        this.$emit('changeData', editor.getData())
        // 实现主动设置情况 不触发 inputValue
        if (this.autoset === true) {
          this.autoset = false
          return
        }
        this.$emit('inputValue', editor.getData())
      })
    })
  },
  methods: {
    focus () {
      this.$el.focus()
    }
  },
  watch: {
    value (v) {
      const { editor } = this
      if (editor && editor.getData() !== v) { // 判断2 避免设置一样的值造成光标移位
        this.autoset = true // 主动设置情况
        editor.setData(v)
      }
    }
  }
}
</script>

<style scoped>
.rich-editor {
  box-sizing: border-box;
  outline: none;
  width: 100%;

  /*滚动条整体*/
  &::-webkit-scrollbar {
    width: 8px; /*滚动条宽度*/
    height: 8px;
  }
  /* 滑道 */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  /*滚动条*/
  &::-webkit-scrollbar-thumb {
    background-color: #f3f3f3;
    border: solid 1px #c0c0c0;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #f3f3e0;
  }
}
</style>
