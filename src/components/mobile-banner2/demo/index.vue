<template>
  <MobileBanner />
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import MobileBanner from '../index.vue'

@Component({
  components: {
    MobileBanner
  }
})
export default class MobileBannerDemo extends Vue {
}
</script>
