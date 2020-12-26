<script>
import scopeElements from '@/utils/corejs/dom/scope-elements'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedId: '',
      foldLevel: undefined
    }
  },
  mounted () {
    // this.updateWidth()
  },
  methods: {
    onClick (e) {
      const reg = /^menu_/
      let eArrow
      scopeElements(e.target, elem => {
        const id = elem.id
        const { classList } = elem
        if (reg.test(id)) {
          const hId = id.replace(reg, '')
          this.selectedId = hId
          this.$emit('select', hId)
          if (eArrow && !classList.contains('fold')) {
            classList.add('fold')
          } else {
            classList.remove('fold')
          }
          return false
        } else if (classList.contains('arrows')) {
          eArrow = elem
        }
      })
    },
    select (id) {
      this.selectedId = id
      const item = document.getElementById('menu_' + id)
      let curr = item
      while (curr) {
        curr.classList.remove('fold')
        curr = curr.parentElement
      }
    },
    updateWidth () {
      const $el = this.$el
      const eList = $el.firstElementChild
      $el.style.width = '10000px'
      eList.style.display = 'inline-block'
      $el.style.width = eList.offsetWidth + 80 + 'px'
      eList.style.display = 'block'
    }
  },
  render () {
    const { foldLevel, selectedId } = this
    function build (list, level = 1) {
      const vList = []
      vList.push(
        <li class="item add">
          <a class="item-cont" href="javascript:;">
            <div class="bar">
              <i class="arrows hidden"></i><span class="name">+ 增加</span>
            </div>
          </a>
        </li>
      )
      list.forEach(item => {
        // const { level } = item
        const child = item.children
        const hasChild = child.length
        const id = item.id
        vList.push(
          <li
            id={'menu_' + id} key={id}
            class={ 'item' + (level >= foldLevel ? ' fold' : '') }
          >
            <a class={'item-cont' + (selectedId === id ? ' selected' : '')} href="javascript:;">
              <div
                class={ 'bar' }
              >
                <i class={'arrows' + (hasChild ? '' : ' hidden')}></i>
                <span class="name" domPropsInnerHTML={item.name}></span>
                <span class="del">删除</span>
              </div>
            </a>
            {hasChild ? build(child, level + 1) : ''}
          </li>
        )
      })
      return (
        <ul class="list">{vList}</ul>
      )
    }
    return <div class="sMenuTree" onClick={this.onClick}>{build(this.list)}</div>
  }
}
</script>

<style scoped>
.sMenuTree {
  background-color: #fff;
  font-size: 14px;

}
.list {
  padding-left: 10px;
  cursor: pointer;
  list-style-type: none;
}
.item {
  /* position: relative; */
}
.item-cont {
  color: #333;
  text-decoration: none;
}
.add .name{
  color: #f00;
}
.del {
  color: #fff;
  /* position: relative;
  margin-left: 6px; */
  display: none;
  background: #f00;
  padding: 0 4px;

  position: absolute;
  right: 0;
}
.item-cont:hover .del {
  display: inline;
}

.bar {
  height: 26px;
  line-height: 2;
  position: relative;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.arrows {
  float: left;
  width: 19px;
  height: 26px;
  background: transparent;
  position: relative;
}
.arrows::before {
  content: '';
  position: absolute;
  top: 9px;
  left: 6px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 4px 0 4px;
  border-color: #666 transparent transparent transparent;
  transition: 0.3s ease;
}
.arrows.hidden {
  visibility: hidden;
}
.item.fold > a > .bar .arrows::before {
  transform: rotate(-90deg);
  border-color: #007bff transparent transparent transparent;
}
.item.fold > .list {
  display: none;
}
.item-cont::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 26px;
  background-color: #fff;
}
.item-cont:hover::before {
  background-color: #eee;
}
.item-cont.selected::before {
  background-color: #ffc;
}
.name {
  position: relative;
}

</style>
