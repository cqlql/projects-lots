<script>
import dataApi from '../data-api'
import LabelText from '../comm/LabelText'
export default {
  render () {
    let itemData = dataApi.currActiveItem
    return (
      <div>
        <div class="tit">位置尺寸</div>
        <div class="it">
          <LabelText type="number" min="0" value={itemData.x} onInputValue={v => { itemData.x = v }} onChange={({ target }) => { itemData.x = target.value }}>x</LabelText>
          <LabelText type="number" min="0" value={itemData.y} onInputValue={v => { itemData.y = v }} onChange={({ target }) => { itemData.y = target.value }}>y</LabelText>
          <LabelText type="number" min="0" value={itemData.w} onInputValue={v => { itemData.w = v }} onChange={({ target }) => { itemData.w = target.value }}>宽</LabelText>
          <LabelText type="number" min="0" value={itemData.h} onInputValue={v => { itemData.h = v }} onChange={({ target }) => { itemData.h = target.value }}>高</LabelText>
        </div>
      </div>
    )
  }
}
</script>
