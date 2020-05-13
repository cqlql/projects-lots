import menuData from './menu.config.js'
export default {
  menuDataKey: {},
  menuDataView: null,
  getMenuDataView () {
    const that = this
    function build (children, newChild) {
      if (children) {
        children.forEach(item => {
          const id = item.path
          const newItem = {
            id,
            name: item.name,
            secondChild: null,
            show: true
          }
          if (id) {
            that.menuDataKey[id] = {
              item,
              newItem
            }
          }
          if (item.children) {
            const c = newItem.children = []
            build(item.children, c)
          }
          newChild.push(newItem)
        })
      }
    }
    let { menuDataView } = this
    if (menuDataView) return menuDataView
    build(menuData, this.menuDataView = menuDataView = [])
    return menuDataView
  },
  getMenuData () {
    return menuData
  }
}
