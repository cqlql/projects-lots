<template>
  <span :class="$style.errorIcon"></span>
</template>

<style module>
.errorIcon {
  width: 16px;
  height: 16px;
  position: relative;
  background-color: #fff;
  border-radius: 100%;
  vertical-align: middle;
}
.errorIcon::before,
.errorIcon::after {
  content: "";
  width: 70%;
  height: 10%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #eb3941;
  transform: rotate(45deg);
}
.errorIcon::after {
  transform: rotate(-45deg);
}
</style>
