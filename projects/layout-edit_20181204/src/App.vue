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
export default {
  components: {
    ViewBox
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
          this.addVideoControl()
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
  height: 200px;
  background-color: #ddd;
  dl {
    margin: 4px;
  }
  dt {
    font-size: 16px;
  }
  dd {
    margin: 4px;
    font-size: 14px;
  }
}
.le-edit-box {
  background-color: #aaa;
  height: 100px;
  margin-right: 100px;
}
</style>
