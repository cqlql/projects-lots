<template>
  <div>
    <VMask v-if="isShow" @click="close"></VMask>
    <transition name="up">
    <div v-if="isShow" class="slide-select">
      <div class="s-bar">
        <!-- <span @click="$set(selectedIndexs, '1',2)">测试更改已选项{{selectedIndexs}}</span> -->
        <!-- <span @click="$set(lists, '1',[1,2,3])">测试更改列表数据{{selectedIndexs}}</span> -->
        <!-- <span @click="test[1]=2">{{test}}</span> -->
        <a class="cl-btn" v-click="close">取消</a>
        <a class="cfm-btn" v-click="confirm">确认</a>
        <!--<div class="s-info">2017/1/1~2018/1/1</div>-->
      </div>
      <div v-if="titles" class="s-tit">
        <div class="s-t" v-for="(tit, i) in titles" :key="i">{{tit}}</div>
      </div>
      <div class="s-err-msg">{{msgErrorTxt}}</div>
      <div class="s-main">
        <ListBase ref="vListBase" v-for="(list,i) of lists" :key="i" :list="list" :index="selectedIndexs[i]" :id="i" @change="change"/>
      </div>
    </div>
    </transition>
  </div>

</template>

<script>
  import ListBase from './ListBase.vue'
  import VMask from '../v-base/BaseMask.vue'
  export default {
    name: 'slide-select',
    // props: ['show', 'titles', 'lists'],
    data () {
      return {
        isShow: 0,
        titles: [],
        lists: [],
        selectedIndexs: [],
        msgErrorTxt: ''
      }
    },
    components: {
      ListBase,
      VMask
    },
    methods: {
      change (index, id) {
        let {selectedIndexs} = this
        this.$set(selectedIndexs, id, index)
        this.onChange(index, id, selectedIndexs)
      },
      confirm () {
        if (this.msgErrorTxt) return // 错误情况跳出
        if (this.onConfirm(this) === false) return
        this.close()
      },
      getSelectedIndexs () {
        // this.$refs.vListBase.forEach(vList => {
        //   console.log(vList.index)
        // })
        let {$set} = this
        let selectedIndexs = this.selectedIndexs
        this.lists.forEach((d, i) => {
          $set(selectedIndexs, i, selectedIndexs[i] || 0)
        })
        return selectedIndexs
      },
      getSelectedValues () {
        let {selectedIndexs} = this
        let selectedValues = []
        this.lists.forEach((list, i) => {
          selectedValues.push(list[selectedIndexs[i] || 0])
        })
        return selectedValues
      },
      getIndexsByValues (lists, selectedValues) {
        let selectedIndexs = []
        selectedValues.forEach((v, id) => {
          let list = lists[id]
          if (list.some(({value}, i) => {
            // clog(value, v) // 测试
            if (value === v) {
              selectedIndexs.push(i)
              return true
            }
          }) === false) {
            selectedIndexs.push(0)
          }
        })
        return selectedIndexs
      },
      getIndexsByValuesBoj (lists, selectedValuesObj) {
        let selectedIndexs = []
        selectedValuesObj.forEach((d, id) => {
          let list = lists[id]
          if (list.some(({value}, i) => {
            // clog(value, v) // 测试
            if (value === d.value) {
              selectedIndexs.push(i)
              return true
            }
          }) === false) {
            selectedIndexs.push(0)
          }
        })
        return selectedIndexs
      },
      close () {
        this.isShow = 0
      },
      // selectedValues 传 undefined、null 将不会进行查找处理
      // 优先处理 selectedValuesObj
      show (options) {
        this.isShow = 1
        this.setOptions(options)
      },
      setList (index, list) {
        this.$set(this.lists, index, list)
      },
      msgError (msgTxt) {
        this.msgErrorTxt = msgTxt
      },
      setOptions (options) {
        if (!options) return
        let {titles, lists, selectedObjIndexs, selectedValues, selectedValuesObj, onConfirm, onChange = () => {}} = options
        if (titles) this.titles = titles
        if (lists) this.lists = lists
        if (selectedObjIndexs) {
          this.selectedIndexs = selectedObjIndexs
        } else if (selectedValuesObj) {
          this.selectedIndexs = this.getIndexsByValuesBoj(lists, selectedValuesObj)
        } else if (selectedValues) {
          this.selectedIndexs = this.getIndexsByValues(lists, selectedValues)
        }
        if (onConfirm) this.onConfirm = onConfirm
        this.onChange = onChange
      }
    }
  }
</script>

<style scoped>
  .slide-select{
    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;

    .s-bar{
      height: 40PX;
      border-bottom: 1PX solid #ccc;

      a{
        text-align: center;
        line-height: 40PX;
        font-size: 16PX;
        color: #26a2ff;
        float: left;
        width: 50%;
      }
    }

    .s-tit{
      display: flex;
      text-align: center;
      .s-t{
        flex: 1;
        font-size: 14PX;
        line-height: 28PX;
        height: 28PX;
      }
    }

    .s-err-msg {
      /* padding-top: 2PX; */
      color: red;
      text-align: center;
      line-height: 1.4;
    }

    .s-main{
      display: flex;
      height:200PX;
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
