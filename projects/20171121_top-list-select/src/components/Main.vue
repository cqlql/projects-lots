<template>
  <div>
    <transition name="fade">
      <div v-show="isShow" class="mask-full" @click="close"></div>
    </transition>
    <transition name="slide-down">
      <keep-alive>
        <TopListSelect v-if="isShow" :list="list" @select="select" :childData="childData"></TopListSelect>
      </keep-alive>
    </transition>
  </div>

</template>

<script>
  import TopListSelect from './TopListSelect.vue'

  export default {
    props: ['isShow', 'list', 'childData'],
    data () {
      return { }
    },
    methods: {
      select (id) {
        this.$emit('select', id)
      },
      close () {
        this.$emit('close')
      }
    },
    components: {
      TopListSelect
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .slide-down-enter-active, .slide-down-leave-active {
    transition: .3s;
    transition-property:opacity,transform;
  }
  .slide-down-enter, .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-30%);
  }
</style>
