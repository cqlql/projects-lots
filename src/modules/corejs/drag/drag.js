import dragPc from './drag-pc'
import dragMobile from './drag-mobile'

export default function drag (params) {
  let unbindDragPc = dragPc(params)
  let unbindDragMobile = dragMobile(params)
  return function () {
    unbindDragPc()
    unbindDragMobile()
  }
}
