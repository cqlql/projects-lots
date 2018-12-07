<script>
import dataApi from '../data-api'
// import LabelText from '../comm/LabelText'
import AddImg from '../comm/AddImg'
import fileSelect from '../comm/file-select'
import ajaxApi from '../ajax-api'
export default {
  render () {
    let itemData = dataApi.currActiveItem
    console.log(itemData)
    return (
      <div>
        <div class="tit">图片</div>
        <div class="it">
          <AddImg ref="vAddImg" onAdd={this.onAdd} initImages={[itemData.image]}/>
        </div>
      </div>
    )
  },
  methods: {
    async onAdd () {
      const file = await fileSelect({
        accept: 'image/*',
        fileSizeLimit: 5,
        onError: (error) => {
          this.$toast.error(error.message)
        }
      })
      const { vAddImg } = this.$refs
      const url = await ajaxApi.fileUpload({
        file,
        onProgress (p) {
          vAddImg.btnText = p + '%'
        }
      })
      vAddImg.btnText = '重新选择'
      vAddImg.images = [url]
    }
  }
}
</script>
