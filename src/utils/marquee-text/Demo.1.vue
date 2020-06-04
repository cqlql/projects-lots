<template>
  <div class="box">
    <!-- <MarqueeTextAcross v-if="show" :html="acrossHtml"></MarqueeTextAcross> -->
    <MarqueeTextDown v-if="show" :html="downHtml"></MarqueeTextDown>
    <p>
      <a @click="show=0">测试销毁</a>
    </p>
    <p>
      <a @click="show=1">显示</a>
    </p>
    <p>
      <a @click="acrossHtml='12'">换数据</a>
    </p>

  </div>
</template>

<script>
  import MarqueeTextAcross from '@/modules/marquee-text/Across'
  import MarqueeTextDown from '@/modules/marquee-text/Down'
  export default {
    data () {
      return {
        show: 1,
        acrossHtml: `紧急通知：请各位班主任带领各自班级下课后到操场集合，请有序入场，不要抢`,
        downHtml: `韩梅梅在步入30岁的前一年，一下子想起了很多几乎快要忘掉的事情。这些事情都在破坏她进入30岁。
      在这之前，韩梅梅对自己的生活还算满意，以她住的小区为界的话，她老公李雷出轨过，但没有把性病带回家，不像楼下张姐的老公。她儿子楠哥送到幼儿园半年，但她没有给阿姨包红包，阿姨也没有拿马桶刷刷楠哥的屁股，不像二单元的豆豆。
      每一年到老公的生日都是韩梅梅最开心的时候，因为可以送礼物。她送过李雷锦旗，从她爸的按摩所里偷来的，改了俩字，为了提醒他多去看望老韩。送过他一个很丑的充气娃娃，为了让他明白她已经知道他出轨了。后来她知道他出轨的对象叫胡婷婷，心里竟有点莫名的安慰，出轨对象的名字跟她的是一个系列的，ABB组合。`
      }
    },
    components: {
      MarqueeTextAcross,
      MarqueeTextDown
    }
  }
</script>

<style>
.box {
  font-size: 16px;
}
</style>

