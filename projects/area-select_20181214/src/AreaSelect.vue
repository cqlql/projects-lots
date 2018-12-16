<template>
  <div>
    <select @change="onChangeProvince">
      <option value>选择省</option>
      <option v-for="d of provinces" :value="d.id" :key="d.id">{{d.name}}</option>
    </select>
    <select @change="onChangeCity" v-if="cities.length">
      <option value>选择市</option>
      <option v-for="d of cities" :value="d.id" :key="d.id">{{d.name}}</option>
    </select>
    <select @change="onChangeCounty" v-if="counties.length">
      <option value>选择区</option>
      <option v-for="d of counties" :value="d.id" :key="d.id">{{d.name}}</option>
    </select>
    <p>{{selectedValue.join(',')}}</p>
    <p>省id：{{selectedProvinceId}}</p>
    <p>市id：{{selectedCityId}}</p>
    <p>区id：{{selectedCountyId}}</p>
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
      selectedProvinceId: '',
      selectedCityId: '',
      selectedCountyId: ''
    }
  },
  computed: {
    selectedId () {
      return this.selectedCountyId || this.selectedCityId || this.selectedProvinceId
    }
  },
  async created () {
    this.provinces = await areaSelect.getProvinces()
  },
  methods: {
    async onChangeProvince ({ target }) {
      let { value: id, selectedIndex } = target
      let province = this.provinces[selectedIndex - 1]
      if (!province) {
        this.cities = []
        this.counties = []
        this.selectedProvinceId = this.selectedCityId = this.selectedCountyId = ''
        this.selectedValue = []
        return
      }
      let selectedValue = this.selectedValue = [province.name]
      let isMunicipalities = this.isMunicipalities = province.isMunicipalities
      if (isMunicipalities) {
        selectedValue[1] = province.name
      }
      this.cities = await areaSelect.getCities(id)
      this.counties = []
      this.selectedProvinceId = id
      this.selectedCityId = this.selectedCountyId = ''
    },
    async onChangeCity ({ target }) {
      let { value: id, selectedIndex } = target
      let city = this.cities[selectedIndex - 1]
      if (!city) {
        this.counties = []
        this.selectedCityId = this.selectedCountyId = ''
        this.selectedValue.splice(this.isMunicipalities ? 2 : 1)
        return
      }
      if (!this.isMunicipalities) {
        this.$set(this.selectedValue, 1, city.name)
      }
      this.counties = await areaSelect.getCounties(id)
      this.selectedCityId = id
      this.selectedCountyId = ''
    },
    onChangeCounty ({ target }) {
      let { value: id, selectedIndex } = target
      let county = this.counties[selectedIndex - 1]
      if (!county) {
        this.selectedCountyId = ''
        this.selectedValue.splice(2)
        return
      }
      this.$set(this.selectedValue, 2, county.name)
      this.selectedCountyId = id
    }
  }
}
</script>
