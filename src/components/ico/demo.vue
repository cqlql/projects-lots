<script>
import IcoTick from './IcoTick.vue'
import IcoDetail from '@/components/morality-manager/@jony/comm/ico/IcoDetail.vue'
export default {
  render () {
    let { $style } = this
    return (
      <div>
        <IcoTick class={$style.iocTick} />
        <IcoDetail class={$style.iocDetail} />
      </div>
    )
  }
}
</script>

<style module>
.iocTick {
  width: 20px;
  height: 20px;
}
.iocDetail {
  width: 20px;
  height: 20px;
  color: #b084f9;
}
</style>
