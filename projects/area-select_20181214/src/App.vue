<template>
  <div>
    <select @change="onChangeProvince">
      <option value="">选择省</option>
      <option v-for="d of provinces" :value="d.id" :key="d.id">{{d.name}}</option>
    </select>
    <select @change="onChangeCity">
      <option value="">选择市</option>
      <option v-for="d of cities" :value="d.id" :key="d.id">{{d.name}}</option>
    </select>
    <select @change="onChangeCounty">
      <option value="">选择区</option>
      <option v-for="d of counties" :value="d.id" :key="d.id">{{d.name}}</option>
    </select>
    <p>{{selectedValue.join(',')}}</p>
    <p>{{selectedId}}</p>
  </div>
</template>

<script>
import areaSelect from './area-select'
export default {
  data () {
    return {
      provinces: [],
      cities: [],
      counties: [],
      selectedValue: [],
      selectedId: ''
    }
  },
  async created () {
    this.provinces = await areaSelect.getProvinces()
  },
  methods: {
    async onChangeProvince ({ target }) {
      let {value: id, selectedIndex} = target
      let province = this.provinces[selectedIndex - 1]
      let selectedValue = this.selectedValue = [province.name]
      let isMunicipalities = this.isMunicipalities = province.isMunicipalities
      if (isMunicipalities) {
        selectedValue[1] = province.name
      }
      this.cities = await areaSelect.getCities(id)
      this.counties = []
      this.selectedId = id
    },
    async onChangeCity ({ target }) {
      let {value: id, selectedIndex} = target
      let city = this.cities[selectedIndex - 1]
      if (!this.isMunicipalities) {
        this.$set(this.selectedValue, 1, city.name)
      }
      this.counties = await areaSelect.getCounties(id)
      this.selectedId = id
    },
    onChangeCounty ({ target }) {
      let {value: id, selectedIndex} = target
      let county = this.counties[selectedIndex - 1]
      this.$set(this.selectedValue, 2, county.name)
      this.selectedId = id
    }
  }
}
</script>

