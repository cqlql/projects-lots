import Vue from 'vue'

let vm = new Vue({
  data: {
    data: null
  },
  methods: {
    create () {
      this.data = 'foo'
    },
    destroy () {
      this.data = null
    }
  }
})

export default vm
