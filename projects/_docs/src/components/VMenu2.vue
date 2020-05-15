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
    select (params) {
      params.e.stopPropagation()
      this.$emit('select', params)
      this.selectedId = params.id
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

    function build (children = [], isChild, level = 0) {
      const list = []
      children.forEach(item => {
        const { children, name, id, secondChild } = item
        let childList = null
        if (children) {
          childList = build(children, isChild, level + 1)
        } else if (secondChild) {
          childList = build(secondChild, true, level + 1)
        }
        list.push(
          <div
            class={[sMenuItem, level < foldLevel ? '' : sFold, id ? sIsLink : '']}
            key={id}
            id={id}
            data-level={level}
            onClick={e => { if (id) select({ e, id, isChild }) }}
          >
            <div class={[sItem, id === selectedId && sSelected]}>
              <i class={children ? '' : sHidden}></i>
              <span class={sTxt} domPropsInnerHTML={name}></span>
            </div>
            <div class={{ [sList]: true, [sChildList]: secondChild !== null }} v-show={item.show}>{childList}</div>
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
  font-size: 14px;
  padding: 8px 10px;
  height: 100%;
  /* font-weight: bold; */
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
.list.childList .isLink .txt{
  color: #00ad1f;
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
