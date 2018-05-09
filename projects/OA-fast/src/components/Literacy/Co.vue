<template>
  <div class="volunt">
    <div class="tit">
      <span class="n">年级：</span><span class="num">三年级</span>
      <span class="n">班级：</span><span class="num">2班</span>
    </div>
    <div class="btns">
      <a class="active">全部</a>
      <a>已上传</a>
      <a>未上传</a>
    </div>
    <div class="cont">
      <table>
        <thead>
        <tr>
          <td>序号</td>
          <td>年级</td>
          <td>班级</td>
          <td>姓名</td>
          <td>身高</td>
          <td>体重</td>
          <td>肺活动量</td>
          <td>500米跑</td>
          <td>立定跳远</td>
          <td>座位前屈</td>
          <td>800米跑</td>
          <td>1000米跑</td>
          <td>一分钟仰卧起坐</td>
          <td>引体向上</td>
          <td>状态</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>2016级</td>
          <td>1班</td>
          <td>李美华</td>
          <td>172.5</td>
          <td>62kg</td>
          <td>3235</td>
          <td>8.1秒</td>
          <td>189</td>
          <td>3</td>
          <td>32秒</td>
          <td>2分20秒</td>
          <td>59个</td>
          <td>59个</td>
          <td>已提交</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2016级</td>
          <td>1班</td>
          <td>李美华</td>
          <td>172.5</td>
          <td>62kg</td>
          <td>3235</td>
          <td>8.1秒</td>
          <td>189</td>
          <td>3</td>
          <td>32秒</td>
          <td>2分20秒</td>
          <td>59个</td>
          <td>59个</td>
          <td>已提交</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2016级</td>
          <td>1班</td>
          <td>李美华</td>
          <td>172.5</td>
          <td>62kg</td>
          <td>3235</td>
          <td>8.1秒</td>
          <td>189</td>
          <td>3</td>
          <td>32秒</td>
          <td>2分20秒</td>
          <td>59个</td>
          <td>59个</td>
          <td>已提交</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2016级</td>
          <td>1班</td>
          <td>李美华</td>
          <td>172.5</td>
          <td>62kg</td>
          <td>3235</td>
          <td>8.1秒</td>
          <td>189</td>
          <td>3</td>
          <td>32秒</td>
          <td>2分20秒</td>
          <td>59个</td>
          <td>59个</td>
          <td>已提交</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2016级</td>
          <td>1班</td>
          <td>李美华</td>
          <td>172.5</td>
          <td>62kg</td>
          <td>3235</td>
          <td>8.1秒</td>
          <td>189</td>
          <td>3</td>
          <td>32秒</td>
          <td>2分20秒</td>
          <td>59个</td>
          <td>59个</td>
          <td>已提交</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .volunt{

    .tit{
      padding: 10px 20px;
      border-bottom:1px solid #ccc;
      margin: 10px 0;
      .n{
        font-size: 15px;
      }
      .num{
        color: #999;
      }
    }
    .btns{
      padding: 0 12px;
      a{
        border: 1px solid #bcc8db;
        padding: 4px 20px;
        display: inline-block;
        border-radius: 4px;
        &.active{
          background-color: #bcc8db;
          color: #fff;

        }
      }
    }
    .cont{
      overflow: auto;
      padding: 10px;
    }
    table{
      width: 100%;
      white-space: nowrap;
    }

    thead{
      tr{
        background-color: #f0bf89;
        color: #fff;
      }
      td{
        padding: 5px;
      }
    }
    tbody{
      color: #999;
      td{
        padding: 10px 5px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
</style>
