<!--
<template>
  <div>
    <h2 :class="$style.h2">demos</h2>
    <ul
      v-for="(item, i, key) of menu" :key="key" :class="$style.p"
    >
      <li>
        <a :to="item.id">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

-->
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      foldLevel: 1,
      selectedId: ''
    }
  },
  methods: {
    select (e, itemData) {
      e.stopPropagation()
      this.$emit('select', { e, itemData })
      this.selectedId = itemData.id
    }
  },
  render () {
    const { $style, foldLevel, selectedId, select } = this

    const {
      menu: sMenu,
      menuList: sMenuList,
      menuItem: sMenuItem,
      item: sItem,
      hidden: sHidden,
      fold: sFold,
      isLink: sIsLink,
      selected: sSelected,
      txt: sTxt,
      list: sList,
      childList: sChildList
    } = $style

    function build (children = [], isChild) {
      const list = []
      children.forEach(item => {
        const { level, children, name, id, secondChild } = item
        let childList = null
        if (children) {
          childList = build(children)
        } else if (secondChild) {
          childList = build(secondChild)
          isChild = true
        }
        list.push(
          <div
            class={[sMenuItem, level < foldLevel ? '' : sFold, id ? sIsLink : '']} key={id}
            id={id} data-level={level}
            onClick={e => { if (id) select(e, item, isChild) }}
          >
            <div class={[sItem, id === selectedId && sSelected]}>
              <i class={children ? '' : sHidden}></i>
              <span class={sTxt} domPropsInnerHTML={name}></span>
            </div>
            <div class={[sList, sChildList]}>{childList}</div>
          </div>
        )
      })
      return list
    }

    const menuList = build(this.data)
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
  font-size: 15px;
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
.childList {
  .item {
    font-size: 13px;
  }
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
