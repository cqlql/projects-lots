<template>
  <div>
    <span :class="$style.select">
      <span :class="$style.container">asdsa</span>
      <span :class="$style.arrow"><b /></span>
    </span>
  </div>
</template>

<style module>
.select {
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 4px;

  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 28px;
  user-select: none;
  position: relative;
}
.container {
  color: #444;
  line-height: 28px;
  display: block;
  padding-left: 8px;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}
.arrow {
  height: 26px;
  position: absolute;
  top: 1px;
  right: 1px;
  width: 20px;
}
.arrow b {
  border-color: #888 transparent transparent transparent;
  border-style: solid;
  border-width: 5px 4px 0 4px;
  height: 0;
  left: 50%;
  margin-left: -4px;
  margin-top: -2px;
  position: absolute;
  top: 50%;
  width: 0;
}
.open b {
  border-color: transparent transparent #888 transparent;
  border-width: 0 4px 5px 4px;
}
</style>
