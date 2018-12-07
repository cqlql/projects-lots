<template>
  <div class="add-img">
    <div class="img-box" v-for="(src,i) of images" :key="i">
      <div class="img-b">
        <img :src="src" />
      </div>
      <i class="close" @click="() => del(i)" ></i>
    </div>
    <a class="add-img-btn" href="javascript:;" @click="$emit('add')">{{btnText}}</a>
  </div>
</template>

<script>
export default {
  props: {
    initImages: Array
  },
  data () {
    return {
      btnText: '选择图片',
      images: []
    }
  },
  created () {
    this.images = this.initImages.slice(0)
  },
  methods: {
    add (url) {
      this.images.push(url)
    },
    del (index) {
      this.images.splice(index, 1)
    }
  },
  watch: {
    images (images) {
      if (!images.length) this.btnText = '选择图片'
    }
  }
}
</script>

<style scoped>
.add-img {
  overflow: hidden;
}
.add-img-btn {
  float: left;
  width: 60px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0 0 6px;
}
.img-box {
  position: relative;
  width: 60px;
  height: 80px;
  float: left;
  margin: 6px 0 0 6px;
  .img-b {
    background-color: #666;
    display: table-cell;
    vertical-align: middle;
    height: 80px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.close {
  width: 16px;
  height: 16px;
  background-color: red;
  position: absolute;
  right: 5px;
  top: 5px;
  pointer-events: auto;
}
.close::before,
.close::after {
  content: '';
  width: 80%;
  height: 2px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #fff;
  transform: rotate(45deg)
}
.close::before {
  transform: rotate(-45deg)
}
</style>
