<template>
  <div>
    <VMask v-if="show" @click="close"></VMask>
    <transition name="up">
      <div v-if="show" class="bottom-options">
        <div class="b-list" @click="onSelect">
          <slot></slot>
          <ul>
            <li @click="close">关闭</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import VMask from '@/components/base/VMask.vue'
  export default {
    props: ['show'],
    methods: {
      close () {
        this.$emit('update:show', 0)
      },
      onSelect (e) {
        let {target} = e
        if (target.tagName === 'LI') {
          this.$emit('select', target)
        }
      }
    },
    components: {
      VMask
    }
  }
</script>

<style scoped>
  .bottom-options{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .b-list{

    }
    ul{
      background-color: #fff;
      text-align: center;
      margin: 10px;
      border-radius: 10px;
    }
    li{
      padding: 10px;
      border-top:1px solid #ddd;
      font-size:16px;
      &:first-child{
        border-top: 0;
      }
    }
  }
  .up-enter-active, .up-leave-active {
    transition: .2s;
    transition-property:transform;

  }
  .up-enter, .up-leave-to {
    transform: translate3d(0, 99%, 0);
  }
</style>
