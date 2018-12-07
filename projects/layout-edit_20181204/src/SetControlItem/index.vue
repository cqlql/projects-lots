<script>
import dataApi from '../data-api'
import PositionSize from './PositionSize'
import ImgSingle from './ImgSingle'
export default {
  render () {
    let setItems = []

    if (dataApi.activeIndex > -1) {
      let { currActiveItem } = dataApi
      setItems.push(<PositionSize class="set-item" />)
      switch (currActiveItem.type) {
        case 1:
          setItems.push(<ImgSingle onChange={src => { currActiveItem.image = src } } class="set-item" />)
          break
        case 2:
          break
        case 3:
          break
        case 4:
          break
        case 5:
          break
      }
    }

    return (
      <div>{setItems}</div>
    )
  }
}
</script>

<style scoped>
.set-item {
  background-color: #eee;
  padding: 4px 6px;
  border-bottom: 1px solid #ddd;
}
.set-item:first-child {
  border-top: 1px solid #ddd;
}
.set-item >>> .tit {
}
</style>
