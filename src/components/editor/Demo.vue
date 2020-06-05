<template>
  <div>
    <RichEditorInline />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
// import RichEditorInline from './EditorInline.vue'
import RichEditorInline from './EditorInlineJS.vue'

@Component({
  components: {
    RichEditorInline
  }
})
export default class RichEditorDemo extends Vue {
}
</script>
