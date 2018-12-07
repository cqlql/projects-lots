<template>
  <div class="head">
    <h1 class="h1">
      <img class="logo" src="@/assets/logo.png" width="30" height="30">
      <span class="name">内容管理平台</span>
    </h1>
    <div class="ope">
      <a class="user">{{$root.userName}}</a>
      <a class="exit" href="javascript:;" @click="logout">
        退出
      </a>
    </div>
  </div>
</template>

<script>
import ajaxApi from '@/modules/ajax-api'
export default {
  methods: {
    logout () {
      ajaxApi.logout()
      this.$root.userName = ''
      this.$router.push('/login')
    }
  }
}
</script>


<style scoped>
.head {
  position: fixed;
  top: 0;
  width: 100%;
  height: 58px;
  background-color: #40b883;
  color: #fff;
  font-size: 14px;
  z-index: 1;
}
.h1 {
  padding-left: 50px;
  line-height: 1;
  padding-top: 16px;
}
.logo {
  vertical-align: middle;
}
.name {
  vertical-align: middle;
}
.ope {
  position: absolute;
  right: 0;
  top: 16px;
}
.user {
  padding-right: 30px;
  /* color: #fff; */
}
.user::before {
  content: "";
  display: inline-block;
  background: url("@/assets/icon.png") no-repeat -23px 0;
  width: 20px;
  height: 23px;
  vertical-align: -4px;
  margin-right: 8px;
}
.exit {
  /* color: #fff; */
  padding-right: 40px;
}
.exit::before {
  content: "";
  display: inline-block;
  background: url("@/assets/icon.png") no-repeat 0 0;
  width: 21px;
  height: 23px;
  vertical-align: -5px;
  margin-right: 8px;
}
/* .user:hover, */
.exit:hover {
  text-decoration: underline;
}
</style>

