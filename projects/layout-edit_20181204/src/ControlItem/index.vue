<script>
import ImageControl from './ImageControl'
import ViewControl from './ViewControl'
import TextControl from './TextControl'
import RollTextControl from './RollTextControl'
import VideoControl from './VideoControl'

import DragMove from './DragMove'
import DragSize from './DragSize'

import autoprefix from '@/modules/corejs/dom-css/autoprefix'
let transform = autoprefix('transform')
export default {
  render () {
    const { d } = this
    let sItem = {
      [transform]: `translate3d(${d.x}px,${d.y}px,0)`,
      width: d.w + 'px',
      height: d.h + 'px'
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
    // 根据情况可能不会有 DragMove, DragSize
    vmCont = [vmCont, <DragMove d={d}/>, <DragSize d={d}/>]
    return <div class="control-item" style={sItem}>{vmCont}</div>
  },
  props: {
    d: Object
  },
  mounted () {
  }
}
</script>

<style scoped>
.control-item {
  position: absolute;
  left: 0;
  right: 0;
  outline: 1px dashed #333;
  background: #fff;
}
</style>
