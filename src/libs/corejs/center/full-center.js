// 铺满居中，可能会出现裁剪
export default function fullCenter (boxW, boxH, elW, elH) {
  let boxRatio = boxW / boxH
  let elRatio = elW / elH
  let x
  let y
  let w
  let h
  if (boxRatio > elRatio) { // 宽度大于元素宽
    w = boxW
    h = w / elRatio
    x = 0
    y = (boxH - h) / 2
  } else {
    h = boxH
    w = h * elRatio
    x = (boxW - w) / 2
    y = 0
  }
  return {
    x,
    y,
    w,
    h
  }
}
