<template>
  <div class="user-center">
    <ul class="grp">
      <li>
        <router-link :to="{name:'Record'}">
          <div class="c">
            <i class="iconfont c1">&#xe6d5;</i><span>学生档案</span></div>
        </router-link>
      </li>
    </ul>

    <ul class="grp">
      <li>
        <router-link :to="{name:'Track'}">
          <div class="c">
            <i class="iconfont c2">&#xe600;</i><span>学生足迹</span></div>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'LiteracyStat'}">
          <div class="c">
            <i class="iconfont c3">&#xe679;</i><span>素养数据</span></div>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'ClassCircle'}">
          <div class="c">
            <i class="iconfont c4">&#xe607;</i><span>班级圈</span></div>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'Volunt'}">
          <div class="c">
            <i class="iconfont c5">&#xe60f;</i><span>义工数据</span></div>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'Co'}">
          <div class="c">
            <i class="iconfont c6">&#xe729;</i><span>体质数据</span></div>
        </router-link>
      </li>
    </ul>
    <ul class="grp">
      <li>
        <router-link :to="{name:''}">
          <div class="c">
            <i class="iconfont c7">&#xe637;</i><span>申请审核</span></div>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:''}">
          <div class="c">
            <i class="iconfont c8">&#xe683;</i><span>学校认证</span></div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style>

  .user-center{
    .grp{
      margin: 10px;
      background-color: #fff;
      color: #666;
      border-radius: 10px;
      box-shadow: 0px 0px 9px #bfbfbf;
      li{

        font-size: 16px;

        &:first-child .c{
          border-top: 0;
        }


        &:active{
          background-color: #eee;
        }

      }
      .c{
        padding: 10px 0;
        margin: 0 10px;
        position: relative;
        border-top: solid 1px #e5e5e5;
        &:after{
          content: '\e628';
          font-family: 'iconfont';
          position: absolute;
          right: 0;
          top: 14px;
          font-size: 18px;
          color: #999;
          font-weight: bold;
        }
      }
      i {
        /*font-family: 'iconfont';*/
        display: inline-block;
        width: 30px;
        height: 30px;
        color: #fff;
        border-radius: 50%;
        font-size: 20px;
        box-sizing: border-box;
        padding: 5px 0;
        text-align: center;
      }
      span{
        padding-left: 9px;
        vertical-align: -1px;
      }

      .c1 {
        color: #15b7b9;
        font-size: 16px;
        vertical-align: -1px;
      }
      .c2 {
        color: #ffaa4f;
        vertical-align: -2px;
      }
      .c3 {
        color: #e188eb;
        vertical-align: -2px;
      }
      .c4 {
        color: #50b780;
        vertical-align: -3px;
      }
      .c5 {
        color: #e0c461;
        vertical-align: -2px;
      }
      .c6 {
        color: #ff6600;
        vertical-align: -2px;
      }
      .c7 {
        color: #2d87c2;
        vertical-align: -2px;
      }
      .c8 {
        color: #ffbc09;
        vertical-align: -2px;
      }
    }

  }

</style>
