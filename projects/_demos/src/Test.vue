<template>
  <div>
    {{name}}  
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'

@Component
export default class Test extends Vue {
  name:string|undefined
}
</script>
