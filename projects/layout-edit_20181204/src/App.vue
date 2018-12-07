<template>
  <div class="layout-edit">
    <!-- <div class="le-bar"></div> -->
    <div class="le-r-set">
      <dl>
        <dt>选择控件</dt>
        <dd @click="addControl">
          <a
            data-type="1"
            href="javascript:void(0);"
          >图片</a>
          <a
            data-type="2"
            href="javascript:void(0);"
          >幻灯片</a>
          <a
            data-type="3"
            href="javascript:void(0);"
          >文本</a>
          <a
            data-type="4"
            href="javascript:void(0);"
          >滚动文字</a>
          <a
            data-type="5"
            href="javascript:void(0);"
          >视频</a>
        </dd>
      </dl>
      <dl>
        <dt>控件</dt>
        <dd>

        </dd>
      </dl>
      <dl>
        <dt>控件属性</dt>
        <dd>
          <SetControlItem/>
        </dd>
      </dl>
    </div>
    <div class="le-edit-box">
      <ViewBox/>
    </div>
    <!-- <div class="le-main"></div> -->
  </div>
</template>

<script>
import dataApi from './data-api'
import ViewBox from './ViewBox'
import SetControlItem from './SetControlItem'
export default {
  components: {
    ViewBox,
    SetControlItem
  },
  created () {
    this.dataBase = dataApi
  },
  methods: {
    addControl ({ target }) {
      switch (target.dataset.type) {
        case '1':
          dataApi.addImageControl()
          break
        case '2':
          this.addViewControl()
          break
        case '3':
          this.addTextControl()
          break
        case '4':
          this.addRollTextControl()
          break
        case '5':
          dataApi.addVideoControl()
          break
      }
    }
  }
}
</script>

<style scoped>
.layout-edit {
}
.le-bar {
  height: 100px;
  background-color: #ddd;
}
.le-main {
}
.le-r-set {
  float: right;
  width: 220px;
  border: 1px solid #ddd;
  dl {
    /* margin: 0; */
  }
  dt {
    margin: 6px 4px;
    font-size: 18px;
    font-weight: bold;
  }
  dd {
    margin: 0;
    font-size: 14px;
  }
}
.le-edit-box {
  background-color: #eee;
  /* height: 100px; */
  /* margin-right: 100px; */
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 240px;
  /* overflow: auto; */
}
</style>
