<template>
  <div>
    <h2 :class="$style.h2">demos</h2>
    <p v-for="(item, i, key) of menu" :key="key" :class="$style.p"><router-link :to="item.path">{{ item.title || item.path }}</router-link></p>
    <router-view />
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  created () {
    console.log(this.menu)
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
    }
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
