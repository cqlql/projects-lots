// 铺满居中
export default function fullCenter (boxW, boxH, elW, elH) {
  let boxRatio = boxW / boxH
  let elRatio = elW / elH
  let x
  let y
  let w
  let h
  if (boxRatio > elRatio) {
    h = boxH
    w = h * elRatio
    x = (boxW - w) / 2
    y = 0
  } else {
    w = boxW
    h = w / elRatio
    x = 0
    y = (boxH - h) / 2
  }
  return {
    x,
    y,
    w,
    h
  }
}
