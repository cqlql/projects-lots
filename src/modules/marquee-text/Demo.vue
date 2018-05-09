<template>
  <div>
    <div>
      <h1>demo 滚动条版本</h1>
      <p>
        <button @click="isRun=!isRun">销毁后定时器是否还在进行</button>
        <button @click="changeText">文本更换，测试根据文本内容多少是否开启滚动</button>
      </p>
      <MarqueeTextDown v-if="isRun" :text="text" :class="$style.box" />
    </div>
    <!-- <Demo/> -->
  </div>
</template>

<script>
import MarqueeTextDown from './MarqueeTextDown.vue'
import Demo from './Demo.1.vue'
const t1 = `
      多年来，不曾一人等候过日落。而当独自一人坐在华山东峰顶，静静观赏夕阳西下和天边绚丽的晚霞时，内心的世界，有了不同往常的从容无恙。而人生，因了这场行走，更加美好辽阔。渐渐地，夕阳消失，起风了。山风从耳边呼啸而过，嘴角扬起的笑意也加深着。不知道未来将是什么样，只愿能一直这样简单安好。
      `
const t2 = `${t1}
      满目星辰的光，在独自越走越远的路上，还是重逢了。抬眼星空，惊喜与感动，同时在内心响应。有这片星空装点这一趟旅途，真是幸运至极。总觉得年轻就是好，可以为了某些念想或某处风景而做一场奔赴，千里迢迢，心向往之。高山不见孤独，异乡无有不安，原来我爱这样的自由，已成了痴迷。难得在有限的生命里，可以去享受，多么幸运。若当他年繁华落尽，再依稀回想起，也是历历温暖的回忆。
      `
export default {
  data () {
    return {
      isRun: 1,
      text: t2
    }
  },
  methods: {
    changeText () {
      this.text = this.text.length === t1.length ? t2 : t1
    }
  },
  components: {
    MarqueeTextDown,
    Demo
  }
}
</script>

<style module>
.box {
  border: 2px solid #ddd;
  height: 300px;
}
</style>
