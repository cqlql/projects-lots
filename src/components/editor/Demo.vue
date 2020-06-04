<template>
  <div>
    <RichEditorInline />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import RichEditorInline from '../RichEditorInline.vue'

@Component({
  components: {
    RichEditorInline
  }
})
export default class RichEditorDemo extends Vue {
}
</script>
