<template>
  <div class="rich-editor ck-content" contenteditable />
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator'
import scriptLoad from '@/utils/corejs/load/script-load'
import LoadOnce from '@/utils/corejs/load-once'
declare global {
  interface Window {
    CKEDITOR: any;
  }
}
let ckeditorLoadOnce = new LoadOnce()
@Component
export default class RichEditorInline extends Vue {
  @Prop({ default: '' }) value!: string
  editor!: any
  autoset!: boolean
  mounted () {
    ckeditorLoadOnce.load(async () => {
      await scriptLoad('//style.shenduxuetang.com/ckeditor/4.11.1/ckeditor.js')
      return window.CKEDITOR
    }).then((CKEDITOR: any) => {
      let sizes = ''
      for (let index = 12; index < 200;) {
        sizes += `${index}/${index}px;`
        index += 2
      }
      let editor = CKEDITOR.inline(this.$el, {
        // 不加载 config.js
        customConfig: '',
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
          { name: 'document', items: [ 'Source', '-', 'Preview' ] },
          { name: 'clipboard', items: [ 'PasteText', 'PasteFromWord' ] },
          { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll' ] },
          { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
          { name: 'links', items: [ 'Link', 'Unlink' ] },
          '/',
          { name: 'basicstyles', items: [ 'Bold', 'Italic', '-', 'CopyFormatting', 'RemoveFormat' ] },
          { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ] },
          '/',
          { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
          { name: 'styles', items: [ 'Format', 'Font', 'FontSize', 'Styles' ] },
          { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
        ]
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
  }
  focus () {
    (this.$el as HTMLElement).focus()
  }
  @Watch('value')
  watchValue (v: string) {
    const { editor } = this
    if (editor && editor.getData() !== v) { // 判断2 避免设置一样的值造成光标移位
      this.autoset = true // 主动设置情况
      editor.setData(v)
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
    background-color:transparent;
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
