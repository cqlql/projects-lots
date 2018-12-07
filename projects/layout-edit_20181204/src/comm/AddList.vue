<template>
  <div class="a-list" :class="imageType?'image':''">
    <VLabel>上传{{typeName}}：</VLabel>
    <VButtonSmall @click="onFileSelect">+上传{{typeName}}</VButtonSmall>
    <ul class="list">
      <li class="item" v-if="file"><span class="name">{{file.name}}</span></li>
    </ul>
  </div>
</template>

<script>
import VLabel from './VLabel'
import VButtonSmall from '@/components/buttons/VButtonSmall'
import fileSelect from '@/modules/corejs/dom/file-select'
import ajaxApi from '@/modules/ajax-api'
export default {
  props: {
    type: {
      type: String,
      default: 'image'
    },
    value: String
  },
  data () {
    return {
      // files: []
      file: null
    }
  },
  computed: {
    typeName () {
      if (this.imageType) {
        return '图片'
      }
      if (this.audioType) {
        return '音频'
      }
    },
    imageType () {
      return this.type === 'image'
    },
    audioType () {
      return this.type === 'audio'
    },
    accept () {
      if (this.imageType) return 'image/*'
      if (this.audioType) return 'audio/*'
    }
  },
  created () {
    this.initValueSet()
  },
  components: {
    VLabel,
    VButtonSmall
  },
  methods: {
    typeTest (type) {
      return new RegExp(`^${this.type}`).test(type)
    },
    onFileSelect () {
      fileSelect(e => {
        let file = e.target.files[0]
        if (this.typeTest(file.type)) {
          ajaxApi.uploadfiles(file).then(fileName => {
            this.file = {
              name: file.name
            }
            this.$emit('select', fileName)
          })
        } else {
          this.$toast.error(`请选择${this.typeName}文件`)
        }
      }, this.accept)
    },
    initValueSet () {
      let {value} = this
      if (value) {
        this.file = {
          name: this.value
        }
      } else {
        this.file = null
      }
    }
  },
  watch: {
    value () {
      this.initValueSet()
    }
  }
}
</script>

<style scoped>
.a-list {
  padding-top: 16px;
}
.list {
	font-size: 14px;
  color: #0ace82;
  /* margin-left: -18px; */
  display: inline-block;
}
.item {
  display: inline-block;
  padding-left: 20px;
  padding-top: 10px;
}
.item::before {
  content: '';
  display: inline-block;
  background: url('@/assets/icon.png') no-repeat -22px -47px;
	width: 20px;
  height: 18px;
  vertical-align: middle;
  padding-right: 8px;
}
.image .item::before {
  display: none;
}
.name {
  vertical-align: middle;
}
</style>
