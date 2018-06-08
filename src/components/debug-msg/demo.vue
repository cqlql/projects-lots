<template>
  <div>
    <p>
      <button @click="show">弹出</button>
      <button @click="gShow">弹出：全局调用</button>
    </p>
    <DMsg ref="vDMsg" />
  </div>
</template>

<script>
import DMsg from './index'
import './w.js'
let count = 0
/* eslint-disable */
export default {
  data () {
    return {
      "IsObjective": true,
      "DifficultyLevel": 3,
      "QuestionType": 2,
      "QuestionDry": {
        "Content": "<p>gtgtgtg<br></p>",
        "Attachments": [{
          "Id": "4740755776909195784",
          "Type": 12,
          "PlayTimes": 1,
          "Name": "gtgtgtgt",
          "FileUrl": "http://a20.shenduxuetang.com/83ccd74a-038b-c398-0cb3-d7d9e7852691.mp3"
        }]
      },
      "QuestionOptionGroups": [{
        "QuestionOptions": [{
          "IsAnswer": true,
          "Content": "<p>gtgtg<br></p>",
          "Attachments": [{
            "Id": "5194473995801911698",
            "Type": 12,
            "PlayTimes": 1,
            "Name": "16656",
            "FileUrl": "http://a20.shenduxuetang.com/c0b27eff-79be-e133-1ba7-7af41155666a.mp3"
          }]
        }, { "IsAnswer": false, "Content": "<p>gtgtg<br></p>", "Attachments": [] }, {
          "IsAnswer": false,
          "Content": "<p>gtgt<br></p>",
          "Attachments": []
        }, { "IsAnswer": false, "Content": "<p>gtgtgtgt<br></p>", "Attachments": [] }],
        "QuestionTip": null,
        "QuestionThinking": [{ "Name": "思路2gtgtg", "Content": "<p>gtgtgtgt<br></p>", "Attachments": [] }]
      }],
      "MethodAnalyze": { "Attachments": [], "MethodAnalyzeOptions": [] },
      "ImportKnowledge": [{ "Kid": "205", "Kname": "测试知识点1" }],
      "FixedTag": ["2015", "", ""],
      "Children": []
    }
  },
  methods: {
    show () {
      this.$refs.vDMsg.show('2222', this.$data, count++)
    },
    hide () {
      this.$refs.vDMsg.hide()
    },
    gShow () {
      window.dmsg('全局', count++)
    }
  },
  components: {
    DMsg
  }
}
</script>
