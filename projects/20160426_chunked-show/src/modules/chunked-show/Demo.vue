<template>
  <ChunkedShow :show="show">
    <div slot="top">
      　许多非美国本土人在美国住了一段时间后，受到这里文化的影响，难免在做事风格和待人处事的方式上有所改变。为在美国的社会文化中更好地生存，我也察觉到自己在不知不觉中已沾染了美国的某些社交互动和思考模式，其中有的已深入我心，有的则仅止于肤浅地模仿。但是，在所有美国文化中，我怎么也无法学习或模仿的，就是做任何事情都“乐在其中”的态度，用美国人的说法，就是“have fun”(玩得开心)。<button @click="show=!show">{{show?'隐藏':'查看'}}</button>
    </div>
    <div slot="bottom">
      虽然我对美国人的许多价值观颇不以为然，但对于美国人在任何事情上都试着“have fun”的态度，非常羡慕。这里说的“have fun”，不是那种狭义的、出去玩的那种玩乐带来的“fun”(乐趣)，但无论是休闲玩乐的活动，还是正经严谨的学习或竞赛，美国人似乎都能尽可能地乐在其中。
    </div>
  </ChunkedShow>
</template>

<script>
  import ChunkedShow from './ChunkedShow'
  export default {
    name: 'demo',
    data () {
      return {
        show: 0
      }
    },
    components: {
      ChunkedShow
    }
  }
</script>

<style scoped>
div{
  line-height: 1.8;
}
</style>
