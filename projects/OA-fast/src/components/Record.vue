<template>
  <div>
    <div class="picture">
      <img src="../assets/imgs/picture.png">
    </div>
    <div class="archives-list">
      <ul>
        <li>
          <div class="arch-w">姓名</div>
          <div class="arch-m">刘雯雯</div>
        </li>
        <li>
          <div class="arch-w">性别</div>
          <div class="arch-m">女</div>
        </li>
        <li>
          <div class="arch-w">出生日期</div>
          <div class="arch-m">2000-05-06</div>
        </li>
        <li>
          <div class="arch-w">政治面貌</div>
          <div class="arch-m">团员</div>
        </li>
        <li>
          <div class="arch-w">民族</div>
          <div class="arch-m">汉</div>
        </li>
        <li>
          <div class="arch-w">电话</div>
          <div class="arch-m">15889709039</div>
        </li>
        <li>
          <div class="arch-w">家庭地址</div>
          <div class="arch-m">深圳市南山区西丽大厦606</div>
        </li>
        <li>
          <div class="arch-w">入学年份</div>
          <div class="arch-m">2016年9月</div>
        </li>
        <li>
          <div class="arch-w">所在班级</div>
          <div class="arch-m">杨美中学 高二3班</div>
        </li>
        <li>
          <div class="arch-w">学籍号</div>
          <div class="arch-m">200011684869</div>
        </li>
        <li>
          <div class="arch-w">学考号</div>
          <div class="arch-m">200011684869</div>
        </li>
        <li>
          <div class="arch-w">兴趣的职业/行业/专业</div>
          <div class="arch-m">电子商务/UI设计/产品经理</div>
        </li>
        <li style="border-bottom: none">
          <div class="arch-w">自我评价：</div>
          <p class="arch-p">本人好学上进，诚信、敬业、责任心强，有强烈的团体精神
            ，对工作认真积极，严谨负责。本人性格内外结合,适应能力
            强，为人诚实，有良好的人际交往能力，具备相关的专业知
            识和认真。</p>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>
.picture{
  text-align: center;
  margin-top: 25px;
  margin-bottom: 15px;
  img{
    width: 77px;
    height:110px ;
    border: 5px solid #fff;
  }
}
  .archives-list
  {
    margin-left: 20px;
    margin-right: 10px;
  }
.archives-list ul li
{
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  overflow: hidden;
}
  .arch-w
  {
    display: inline;
    font-size: 13px;
    font-weight: bold;
    color: #666
  }
.arch-m
{
  margin-right: 10px;
  font-size: 13px;
  font-weight: bold;
  color: #aaa;
  text-align: right;
  float: right;
}
.arch-p
{
  margin-right: 10px;
  font-size: 13px;
  font-weight: bold;
  color: #aaa;
  line-height: 20px;
}
</style>
