<template>
  <div class="top-list-select">
    <div class="cont">
      <ul class="l-mu" @click="sw">
        <li v-for="(d,i) in menu" :class="{active:selected===i}" :data-id="d.id" :data-index="i">{{d.name}}</li>
      </ul>
      <div class="r-bd">
        <component :is="currentView" :list="list" @close="close"></component>
      </div>
    </div>
    <div class="bg" @click="close"></div>
  </div>
</template>

<script>
  import List from './List.vue'
  export default {
    data () {
      return {
        selected: 0,
        menu: [{
          id: 1,
          name: '班级'
        }, {
          id: 2,
          name: '姓名'
        }, {
          id: 3,
          name: '年级'
        }, {
          id: 4,
          name: '日期'
        }, {
          id: 5,
          name: '学校'
        }],
        currentView: 'List',
        listData: {
          1: [{
            name: '全部'
          }, {
            name: '三年级1班'
          }, {
            name: '三年级2班'
          }, {
            name: '三年级3班'
          }, {
            name: '三年级4班'
          }, {
            name: '三年级5班'
          }, {
            name: '三年级6班'
          }],
          2: [{
            name: '李时勉'
          }, {
            name: '程老虎'
          }, {
            name: '李梅'
          }, {
            name: '于凯'
          }, {
            name: '王泽斌'
          }],
          3: [{
            name: '全部'
          }, {
            name: '一年级'
          }, {
            name: '二年级'
          }, {
            name: '三年级'
          }, {
            name: '四年级'
          }, {
            name: '五年级'
          }, {
            name: '六年级'
          }],
          4: [{
            name: '李时勉'
          }, {
            name: '程老虎'
          }, {
            name: '李梅'
          }, {
            name: '于凯'
          }, {
            name: '王泽斌'
          }],
          5: [{
            name: '杨美学校'
          }, {
            name: '龙岗学校'
          }]
        },
        list: []
      }
    },
    mounted () {
      this.list = this.listData[this.menu[this.selected].id]
    },
    methods: {
      sw (e) {
        let {target} = e
        if (target.tagName === 'LI') {
          let {index, id} = target.dataset
          index *= 1
          this.list = this.listData[id]
          this.selected = index

          switch (index) {
            case 3:
              this.currentView = ''
              break
            default:
              this.currentView = 'List'
          }
        }
      },
      close () {
        this.$emit('close')
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
    height: 100%;

    .cont {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 70%;
      background-color: #fff;
      z-index: 1;
    }
    .l-mu {
      background-color: #ebebeb;
      /*width: 110px;*/
      flex: 110px 0;
      color: #999;
      text-align: center;
      font-size: 15px;
      li {
        padding: 16px 0;
        &.active {
          background-color: #fff;
        }
      }
    }
    .r-bd {
      flex: 1;
    }
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

</style>
