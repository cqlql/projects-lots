// 居中，元素完全展示
export default function center (boxW, boxH, elW, elH) {
  let boxRatio = boxW / boxH
  let elRatio = elW / elH
  let x
  let y
  let w
  let h
  if (boxRatio > elRatio) { // 宽度大于元素宽
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
