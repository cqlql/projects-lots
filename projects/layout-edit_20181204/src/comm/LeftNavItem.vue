<template>
  <div class="item" :class="itemClass" @click="select">
    <div v-if="isInput"><BaseText class="ipt" ref="vBaseText" @inputValue="onInputValue" :value="data.name" @keyupEnter="$emit('keyupEnter')" @keyupEsc="$emit('keyupEsc')"/></div>
    <div v-else>
      {{data.name}}
        <div class="ope">
          <a class="edit" href="javascript:;" @click="$emit('edit')"></a>
          <a class="del" href="javascript:;" @click="$emit('del')"></a>
        </div>
    </div>
  </div>
</template>

<script>
import BaseText from '@/components/forms/BaseText'
// import ajaxApi from '@/modules/ajax-api'
export default {
  props: {
    data: {
      default () { return {} },
      type: Object
    },
    selectedId: Number,
    type: String // label
  },
  data () {
    return {
    }
  },
  computed: {
    isInput () {
      return this.type === 'input'
    },
    isSelected () {
      return this.selectedId === this.data.id
    },
    itemClass () {
      if (this.isInput) {
        return 'ipt-box'
      } else if (this.isSelected) {
        return 'selected'
      }
    }
  },
  methods: {
    select () {
      this.$emit('select', this.data)
    },
    focus () {
      this.$refs.vBaseText.focus()
    },
    onInputValue (v) {
      this.$emit('inputValue', v)
    },
    selectAll () {
      this.$refs.vBaseText.selectAll()
    },
    clear () {
      this.$refs.vBaseText.$el.value = ''
    }
  },
  components: {
    BaseText
  }
}
</script>


<style scoped>
.item.ipt-box {
      padding: 0px 8px;
    line-height: 3.6;
    position: relative;
    z-index: 1;
    background-color: #f6f6f6;
}
.ipt {
  border: 1px solid #dcdcdc;
    padding: 0 12px;
    height: 30px;
    width: 100%;
    box-sizing: border-box;
}

.item {
  padding-left: 38px;
  height: 50px;

  color: #666666;
  line-height: 3.8;
  position: relative;
}
.item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  /* background: #ccc; */
  background: #e0e0e0;
}
.item::before {
  content: "";
  position: absolute;
  top:0;
  right: 0;
  width: 5px;
  height: 100%;
  background: #40b883;
  display: none;
}
.item.selected {
  background-color: #ffffff;
  /* border-right: 5px solid #40b883; */
}
.item.selected::before {
  display: block;
}
.item.selected::after {
  display: none;
}
.ope {
  position: absolute;
  right: 0;
  top: 3px;
  display: none;
}
.item:hover .ope {
  display: block;
}
.edit {
  display: inline-block;
  margin-right: 8px;
  background: url("@/assets/icon.png") no-repeat -22px -25px;
  width: 20px;
  height: 20px;
}
.del {
  display: inline-block;
  margin-right: 12px;
  background: url("@/assets/icon.png") no-repeat 0 -25px;
  width: 20px;
  height: 20px;
}
</style>
