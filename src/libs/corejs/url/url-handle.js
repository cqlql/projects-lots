
export default {
  getHash () {
    return location.hash.replace(/^#/, '')
  },
  getSearch () {
    return location.search.replace(/^?/, '')
  }
}
