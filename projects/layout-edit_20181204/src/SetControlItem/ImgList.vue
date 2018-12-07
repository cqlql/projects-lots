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
        </div>
      </div>
    )
  },
  methods: {
    onChangeX ({ target }) {
      dataApi.currActiveItem.x = target.value
    },
    onInputValueX (v) {
      dataApi.currActiveItem.x = v
    }
  }
}
</script>
