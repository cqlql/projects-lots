<template>
  <label class="label-switch">
    <input type="checkbox" v-model="val">
    <div class="checkbox"></div>
  </label>
</template>

<script>
  export default {
    name: 'label-switch',
    props: ['checked'],
    data () {
      return {
        val: false
      }
    },
    mounted () {
      this.val = this.checked
    },
    watch: {
      val (v) {
        this.$emit('update:checked', v)
      },
      checked (v) {
        this.val = v
      }
    }
  }
</script>

<style scoped>
  .label-switch {
    display: inline-block;
    vertical-align: middle;
    width: 52px;
    border-radius: 16px;
    box-sizing: border-box;
    height: 32px;
    position: relative;
    cursor: pointer;
    -ms-flex-item-align: center;
    -webkit-align-self: center;
    align-self: center;
  }
  .label-switch .checkbox {
    width: 52px;
    border-radius: 16px;
    box-sizing: border-box;
    height: 32px;
    background: #e5e5e5;
    z-index: 0;
    margin: 0;
    padding: 0;
    appearance: none;
    border: none;
    cursor: pointer;
    position: relative;
    -webkit-transition-duration: 300ms;
    transition-duration: 300ms;
  }
  .label-switch .checkbox:before {
    content: ' ';
    position: absolute;
    left: 2px;
    top: 2px;
    width: 48px;
    border-radius: 16px;
    box-sizing: border-box;
    height: 28px;
    background: #fff;
    z-index: 1;
    transition-duration: 300ms;
    transform: scale(1);
  }
  .label-switch .checkbox:after {
    content: ' ';
    height: 28px;
    width: 28px;
    border-radius: 28px;
    background: #fff;
    position: absolute;
    z-index: 2;
    top: 2px;
    left: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
    transform: translateX(0px);
    transition-duration: 300ms;
  }
  .label-switch input[type="checkbox"] {
    display: none;
  }
  .label-switch input[type="checkbox"]:checked + .checkbox {
    background: #4cd964;
  }
  .label-switch input[type="checkbox"]:checked + .checkbox:before {
    transform: scale(0);
  }
  .label-switch input[type="checkbox"]:checked + .checkbox:after {
    transform: translateX(22px);
  }
</style>
