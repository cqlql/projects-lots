import weatherInfoLoad from './weather-info-load'
import getCityRankById from './get-city-rank-by-id'
import getCityId from './get-city-id'

// 空气质量
function getCityRank (cityName, cb) {
  // cityName = '深圳'
  let cityId = getCityId(cityName)
  getCityRankById(cityId, cb)
}

// 天气
function getWeatherInfo (cityName, cb) {
  // cityName = '深圳'
  let cityId = getCityId(cityName)
  weatherInfoLoad(cityId, cb)
}

export {
  getCityRank,
  getWeatherInfo
}
