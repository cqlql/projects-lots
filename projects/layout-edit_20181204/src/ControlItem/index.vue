<script>
import ImageControl from './ImageControl'
import ViewControl from './ViewControl'
import TextControl from './TextControl'
import RollTextControl from './RollTextControl'
import VideoControl from './VideoControl'

import DragMove from './DragMove'
import DragSize from './DragSize'

import dataApi from '../data-api'

import autoprefix from '@/modules/corejs/dom-css/autoprefix'
let transform = autoprefix('transform')
export default {
  render () {
    const { d } = this
    const { activeIndex, core } = dataApi
    const { edit } = core
    let sItem = {
      [transform]: `translate3d(${d.x}px,${d.y}px,0)`,
      width: d.w + 'px',
      height: d.h + 'px',
      'z-index': d.zIndex
    }

    let vmCont
    switch (d.type) {
      case 1:
        vmCont = <ImageControl d={d}/>
        break
      case 2:
        vmCont = <ViewControl d={d}/>
        break
      case 3:
        vmCont = <TextControl d={d}/>
        break
      case 4:
        vmCont = <RollTextControl d={d}/>
        break
      case 5:
        vmCont = <VideoControl d={d}/>
        break
    }

    // 只有编辑清空才会有 DragMove, DragSize
    if (edit) vmCont = [vmCont, <DragMove d={d}/>, <DragSize d={d}/>]

    return <div onMousedown={this.onActive} class={{ edit, 'control-item': true, active: activeIndex === this.index }} style={sItem}>{vmCont}</div>
  },
  props: {
    d: Object,
    index: Number
  },
  methods: {
    onActive () {
      dataApi.activeItem(this.index)
    }
  }
}
</script>

<style scoped>
.control-item {
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  outline: 1px dashed #333;
}
.control-item.edit {
  outline: 1px dashed #333;
}
.control-item.active {
  outline: 2px solid #0087a9;
  box-shadow: 0px 0px 12px #0087a9;
}
</style>
