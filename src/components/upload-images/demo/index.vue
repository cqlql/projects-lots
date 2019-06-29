<template>
  <div>
    <p>
      <UploadImages />
    </p>
    <p>
      <UploadImages multiple="1" />
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import UploadImages from '../index.vue'

@Component({
  components: {
    UploadImages
  }
})
export default class UploadImagesDemo extends Vue {
}
</script>
