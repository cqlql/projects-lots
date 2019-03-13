<template>
  <div :class="$style.statList">
    <div class="item">
      <div class="tit">二年级1班</div>
      <div class="row">
        <span class="tt">礼仪规范分值/等级：</span>
        <span class="ct">9.40/a</span>
      </div>
      <div class="row">
        <span class="tt">课间操分值/等级：</span>
        <span class="ct">9.80/a</span>
      </div>
      <div class="row">
        <span class="tt">早读与晚自习分值/等级：</span>
        <span class="ct">9.85/b</span>
      </div>
      <div class="row">
        <span class="tt">午休分值/等级：</span>
        <span class="ct">10.00/a</span>
      </div>
    </div>
    <div class="item">
      <div class="tit">二年级1班</div>
      <div class="row">
        <span class="tt">卫生分值/等级：</span>
        <span class="ct">10.00/a</span>
      </div>
      <div class="row">
        <span class="tt">宿舍常规管理分值/等级：</span>
        <span class="ct">10.00/a</span>
      </div>
      <div class="row">
        <span class="tt">考试规范管理分值/等级：</span>
        <span class="ct">40.00/a</span>
      </div>
    </div>
  </div>
</template>

<style module>
.statList :global{
  .item {
    color: #999;
    padding: 10px 12px;
    border-top: 1px solid #ddd;
    background: #fff;
    /* padding: 0 12px; */
  }
  .item:first-child {
    border-top: none;
  }
  .tit {
    font-size: 18px;
    color: #555;
    padding: 8px 0;
  }

  .row {
    padding: 8px 0
  }
  .em {
    color: #f60;
  }
}
</style>