<template>
  <div class="top-list-select">
    <div class="cont">
      <ul class="l-mu" @click="onClickLeft">
        <li v-for="(item,i) in list" :data-index="i" :class="{active:selectedIndex===i}">{{item.name}}</li>
      </ul>
      <div class="r-bd">
        <component v-bind:is="currentView" :childData="childData">
          <!-- 组件在 vm.currentview 变化时改变！ -->
        </component>
      </div>
    </div>
  </div>
</template>

<script>
  import List from './List.vue'
  export default {
    props: ['list', 'childData'],
    data () {
      return {
        selectedIndex: 0,
        currentView: ''
      }
    },
    mounted () {
      this.update()
    },
    methods: {
      onClickLeft (e) {
        let {target} = e
        if (target.tagName === 'LI') {
          this.selectLeft(target.dataset.index * 1)
        }
      },
      selectLeft (index) {
        let d = this.list[index]
        this.currentView = d.childComponentName
        this.selectedIndex = index
        this.$emit('select', d.id)
      },
      update () {
        this.selectLeft(this.selectedIndex)
      }
    },
    components: {
      List
    }
  }
</script>

<style scoped>
  .top-list-select {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    z-index: 100;

    .cont {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      z-index: 1;
    }
    .l-mu {
      list-style: none;
      padding: 0;
      margin: 0;

      background-color: #ebebeb;

      color: #999;
      text-align: center;
      font-size: 15px;
      overflow-y: auto;

      -webkit-tap-highlight-color:transparent;

      /*width: 110px;*/
      flex: 110px 0;
      li {
        padding: 16px 0;
        &.active {
          background-color: #fff;
        }
      }
    }
    .r-bd {
      overflow-y: auto;
      flex: 1;
    }
  }
</style>
