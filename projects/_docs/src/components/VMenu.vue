<!--
<template>
  <div>
    <h2 :class="$style.h2">demos</h2>
    <ul
      v-for="(item, i, key) of menu" :key="key" :class="$style.p"
    >
      <li>
        <a :to="item.path">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

-->
<script>
import menu from '../menu.config.js'
export default {
  data () {
    return {
      foldLevel: 1,
      selectedId: ''
    }
  },
  methods: {
    select (e, itemData) {
      e.stopPropagation()
      this.$emit('select', itemData)
      this.selectedId = itemData.path
    }
  },
  render () {
    let { $style, foldLevel, selectedId, select } = this

    let {
      menu: sMenu,
      menuList: sMenuList,
      menuItem: sMenuItem,
      item: sItem,
      hidden: sHidden,
      fold: sFold,
      isLink: sIsLink,
      selected: sSelected,
      txt: sTxt,
      list: sList
    } = $style

    function build (children = []) {
      const list = []
      children.forEach(item => {
        let { level, children, name, path, show = true } = item
        if (!show) return
        children = children || []
        const childList = build(children)
        list.push(
          <div
            class={[sMenuItem, level < foldLevel ? '' : sFold, path ? sIsLink : '']} key={path}
            id={path} data-level={level}
            onClick={e => { if (path) select(e, item) }}
          >
            <div class={[sItem, path === selectedId && sSelected]}>
              <i class={children.length === 0 ? sHidden : ''}></i>
              <span class={sTxt} domPropsInnerHTML={name}></span>
            </div>
            <div class={sList}>{childList}</div>
          </div >
        )
      })
      return list
    }

    const menuList = build(menu)
    return (
      <div class={sMenu}>
        <div class={sMenuList}>
          {menuList}
        </div>
      </div>
    )
  }
}
</script>

<style module>
.menu {
  box-sizing: border-box;
  background-color: #fff;
  /* border-right: 1px solid #efefef; */
  font-size: 14px;
  padding: 8px 10px;
  height: 100%;
}
.menuList {
  /* position: absolute;
  top: 122px;
  bottom: 0;
  width: 100%;
  overflow: auto; */
}

.txt {
  position: relative;
}
.isLink .txt {
  /* text-decoration: underline; */
  color: #0085ff;
}

.list {
  padding-left: 16px;
}
.item {
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  height: 26px;
  line-height: 2;
}
.item:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 26px;
  background-color: #efefef;
  opacity: 0;
}
.item:hover:before {
  opacity: 1;
}
.item.selected:before {
  opacity: 1;
  background-color: #ffc;
}
/* .item i {
  float: left;
  width: 19px;
  height: 26px;
  background: transparent;
  position: relative;
  user-select:none
}

.item i:after {
  content: "";
  position: absolute;
  border: 0 dashed transparent;
  width: 0;
  height: 0;
  border-width: 4px;
  border-top-width: 8px;
  border-top-style: solid;
  border-top-color: #000;
  left: 5px;
  top: 10px;
}
.item i:hover:after {
  opacity: 0.5;
} */
</style>
