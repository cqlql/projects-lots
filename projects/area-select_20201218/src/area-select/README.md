# 地区选择器

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
