<template>
<div>
  <table @click="select">
    <tr>
      <td><div class="btn">1</div></td>
      <td><div class="btn">3</div></td>
      <td><div class="btn">2</div></td>
    </tr>
    <tr>
      <td><div class="btn">5</div></td>
      <td><div class="btn">4</div></td>
      <td><div class="btn">6</div></td>
    </tr>
    <tr>
      <td><div class="btn">8</div></td>
      <td><div class="btn">7</div></td>
      <td><div class="btn">9</div></td>
    </tr>
  </table>
</div>
</template>

<script>
  export default {
    methods: {
      select ({target}) {
        if (target.tagName === 'DIV') {
          this.$emit('input', target.textContent)
        }
      }
    }
  }
</script>

<style scoped>
.btn{
  padding: 20px;
  border: 1px solid #ddd;
  &:active {
    background-color: #ddd;
  }
}
</style>
