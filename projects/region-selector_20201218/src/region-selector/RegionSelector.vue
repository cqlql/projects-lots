<template>
  <RSInput :get="getRegionList" :loading="loading" @change="change" />
</template>

<script>
import RSInput from './RSInput.vue'
// import { area } from "@/api/area"
export default {
  components: { RSInput },
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    getRegionList (id = '1') {
      // this.loading = true
      // return area({ id }).then((res) => {
      //   if (res.code == 200) {
      //     return res.data.map((item) => {
      //       return {
      //         id: item.id,
      //         name: item.name,
      //         level: item.level
      //       }
      //     })
      //   }
      // }).finally(() => this.loading = false);
      if (id === '1') {
        return new Promise((resolve, reject) => {
          resolve(
            [
              {
                id: '2',
                name: '北京',
                level: '1'
              },
              {
                id: '14',
                name: '湖南',
                level: '1'
              },
              {
                id: '4',
                name: '福建',
                level: '1'
              },
              {
                id: '5',
                name: '甘肃',
                level: '1'
              },
              {
                id: '6',
                name: '广东',
                level: '1'
              }
            ]
          )
        })
      }
      if (id === '14') {
        return new Promise((resolve, reject) => {
          resolve(
            [
              {
                id: '197',
                parent_id: '14',
                name: '长沙',
                level: '2',
                pinyin: 'changsha',
                pinyin_short: 'cs',
                company_id: '0'
              },
              {
                id: '198',
                parent_id: '14',
                name: '张家界',
                level: '2',
                pinyin: 'zhangjiajie',
                pinyin_short: 'zjj',
                company_id: '0'
              },
              {
                id: '199',
                parent_id: '14',
                name: '常德',
                level: '2',
                pinyin: 'changde',
                pinyin_short: 'cd',
                company_id: '0'
              },
              {
                id: '200',
                parent_id: '14',
                name: '郴州',
                level: '2',
                pinyin: 'chenzhou',
                pinyin_short: 'cz',
                company_id: '0'
              },
              {
                id: '201',
                parent_id: '14',
                name: '衡阳',
                level: '2',
                pinyin: 'hengyang',
                pinyin_short: 'hy',
                company_id: '0'
              },
              {
                id: '202',
                parent_id: '14',
                name: '怀化',
                level: '2',
                pinyin: 'huaihua',
                pinyin_short: 'hh',
                company_id: '0'
              },
              {
                id: '203',
                parent_id: '14',
                name: '娄底',
                level: '2',
                pinyin: 'loudi',
                pinyin_short: 'ld',
                company_id: '0'
              },
              {
                id: '204',
                parent_id: '14',
                name: '邵阳',
                level: '2',
                pinyin: 'shaoyang',
                pinyin_short: 'sy',
                company_id: '0'
              },
              {
                id: '205',
                parent_id: '14',
                name: '湘潭',
                level: '2',
                pinyin: 'xiangtan',
                pinyin_short: 'xt',
                company_id: '0'
              },
              {
                id: '206',
                parent_id: '14',
                name: '湘西',
                level: '2',
                pinyin: 'xiangxi',
                pinyin_short: 'xx',
                company_id: '0'
              },
              {
                id: '207',
                parent_id: '14',
                name: '益阳',
                level: '2',
                pinyin: 'yiyang',
                pinyin_short: 'yy',
                company_id: '0'
              },
              {
                id: '208',
                parent_id: '14',
                name: '永州',
                level: '2',
                pinyin: 'yongzhou',
                pinyin_short: 'yz',
                company_id: '0'
              },
              {
                id: '209',
                parent_id: '14',
                name: '岳阳',
                level: '2',
                pinyin: 'yueyang',
                pinyin_short: 'yy',
                company_id: '0'
              },
              {
                id: '210',
                parent_id: '14',
                name: '株洲',
                level: '2',
                pinyin: 'zhuzhou',
                pinyin_short: 'zz',
                company_id: '0'
              }
            ]
          )
        })
      }
      return new Promise((resolve, reject) => {
        resolve(
          [
            {
              id: '1661',
              parent_id: '199',
              name: '武陵区',
              level: '3',
              pinyin: 'wulingqu',
              pinyin_short: 'wlq',
              company_id: '0'
            },
            {
              id: '1662',
              parent_id: '199',
              name: '鼎城区',
              level: '3',
              pinyin: 'dingchengqu',
              pinyin_short: 'dcq',
              company_id: '0'
            },
            {
              id: '1663',
              parent_id: '199',
              name: '津市市',
              level: '3',
              pinyin: 'jinshishi',
              pinyin_short: 'jss',
              company_id: '0'
            },
            {
              id: '1664',
              parent_id: '199',
              name: '安乡县',
              level: '3',
              pinyin: 'anxiangxian',
              pinyin_short: 'axx',
              company_id: '0'
            },
            {
              id: '1665',
              parent_id: '199',
              name: '汉寿县',
              level: '3',
              pinyin: 'hanshouxian',
              pinyin_short: 'hsx',
              company_id: '0'
            },
            {
              id: '1666',
              parent_id: '199',
              name: '澧县',
              level: '3',
              pinyin: 'lixian',
              pinyin_short: 'lx',
              company_id: '0'
            },
            {
              id: '1667',
              parent_id: '199',
              name: '临澧县',
              level: '3',
              pinyin: 'linlixian',
              pinyin_short: 'llx',
              company_id: '0'
            },
            {
              id: '1668',
              parent_id: '199',
              name: '桃源县',
              level: '3',
              pinyin: 'taoyuanxian',
              pinyin_short: 'tyx',
              company_id: '0'
            },
            {
              id: '1669',
              parent_id: '199',
              name: '石门县',
              level: '3',
              pinyin: 'shimenxian',
              pinyin_short: 'smx',
              company_id: '0'
            }
          ]
        )
      })
    },
    change (values) {
      this.$emit('change', values)
    }
  }
}
</script>
