# 地区选择器

RSBase 没有依赖。RSInput、RegionSelector 依赖 elementUi。如需选择其他 ui 框架，只需重写 RSInput、RegionSelector 即可


## 使用

```html
<!-- 
  其中 id 为当前选中 id
 -->
<AreaSelect v-model="id" />

<script>
import AreaSelect from './area-select/AreaSelect.vue'

export default {
  components: { AreaSelect },
  data () {
    return {
      id: ''
    }
  }
}
</script>
```
