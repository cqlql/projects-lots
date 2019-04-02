<template>
  <div>
    <h2 :class="$style.h2">demos</h2>
    <p v-for="(item, i, key) of menu" :key="key" :class="$style.p"><a :to="item.path">{{ item.name }}</a></p>
  </div>
</template>

<script>
import menu from './menu.config.js'
export default {
  data () {
    return {
      menu
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to)
    next()
  }
}
</script>

<style module>
.h2 {
  padding: 20px 6px 0;
  font-size: 16px
}
.p {
  padding: 4px 10px;
  a {
    color: blue;
    text-decoration: underline
  }
}
</style>
