<template>
  <div>
      <LabelText class="tb-label-text" :class="{err:error&&!options[0]}" :value="options[0]" placeholder="请输入A选项内容" @inputValue="v => onInputValue(v, 0)">A：</LabelText>
      <LabelText class="tb-label-text" :class="{err:error&&!options[1]}" :value="options[1]" placeholder="请输入B选项内容" @inputValue="v => onInputValue(v, 1)">B：</LabelText>
      <LabelText class="tb-label-text" :value="options[2]" placeholder="请输入C选项内容" @inputValue="v => onInputValue(v, 2)">C：</LabelText>
      <LabelText class="tb-label-text" :value="options[3]" placeholder="请输入D选项内容" @inputValue="v => onInputValue(v, 3)">D：</LabelText>
  </div>
</template>

<script>
import LabelText from './LabelText'
export default {
  components: {
    LabelText
  },
  props: {
    options: Array,
    error: Boolean
  },
  // created () {
  //   this.initSet()
  // },
  methods: {
    onInputValue (v, i) {
      this.$emit('inputValue', v, i)
    }
  },
  watch: {
    options () {
      console.log(123)
    }
  }
}
</script>

<style scoped>
.tb-label-text {
  margin: 12px 0;
}
.err >>> .lb-text{
  color:#ed5564;
}
.err >>> .form-control {
  border-color: #ed5564;
}
.err >>> .form-control::placeholder{
  color: #ed5564;
}
</style>

