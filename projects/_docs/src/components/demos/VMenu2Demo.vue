<template>
  <div>
    <!-- <button class="button" @click="onClick">测试</button> -->
    <VMenu2 :data="menuData" @select="onSelect" />
  </div>
</template>

<script>
import VMenu2 from '../VMenu2.vue'
export default {
  components: {
    VMenu2
  },
  data () {
    return {
      menuData: [
        {
          name: '个人项目',
          children: [
            {
              name: '开发笔记',
              id: 'note'
            }
          ]
        },
        {
          name: 'vue UI组件',
          children: [
            {
              name: 'toast 轻提醒',
              id: '/toast',
              secondChild: [
                {
                  name: 'zoom-touch(触摸捏合放大)',
                  id: '/zoom-touch'
                },
                {
                  name: 'image-crop(裁图)',
                  id: '/image-crop'
                },
                {
                  name: 'v-transition (常用 vue transition 动画)',
                  id: '/v-transition'
                }
              ]
            },
            {
              name: 'bottom-load(到底加载)',
              id: '/bottom-load',
              children: [
                {
                  name: 'bottom-load(到底加载)',
                  id: '/bottom-load'
                },
                {
                  name: 'buttons',
                  id: '/buttons'
                },
                {
                  name: 'pulldown-refresh(下拉刷新+到底加载)',
                  id: '/pulldown-refresh'
                }
              ]
            },
            {
              name: 'buttons',
              id: '/buttons'
            },
            {
              name: 'pulldown-refresh(下拉刷新+到底加载)',
              id: '/pulldown-refresh'
            }
          ]
        }
      ]
    }
  },
  methods: {
    onSelect ({ isChild, item }) {
      console.log(isChild, item)
      if (item.secondChild) {
        item.secondChild = null
      } else if (!isChild) {
        item.secondChild = [
          {
            name: 'zoom-touch(触摸捏合放大)',
            id: '/zoom-touch'
          },
          {
            name: 'image-crop(裁图)',
            id: '/image-crop'
          },
          {
            name: 'v-transition (常用 vue transition 动画)',
            id: '/v-transition'
          }
        ]
      }
    },
    onClick () {

    }
  }
}
</script>
