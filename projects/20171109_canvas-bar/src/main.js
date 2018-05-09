import './css/index.css'
import ChartBar from './js/chart-bar'
import ChartLine from './js/chart-line'

let barData = ([{
  'QuestionId': 0,
  'Id': 2018,
  'Name': '一元一次方程',
  'PersonalScore': 12,
  'PersonalFullScore': 20,
  'PersonalRate': 0.6,
  'ClassScore': 108,
  'ClassFullScore': 120,
  'ClassRate': 0.9
}, {
  'QuestionId': 0,
  'Id': 977,
  'Name': '一元一次方程的解法',
  'PersonalScore': 80,
  'PersonalFullScore': 80,
  'PersonalRate': 1,
  'ClassScore': 460,
  'ClassFullScore': 480,
  'ClassRate': 0.9583
}, {
  'QuestionId': 0,
  'Id': 11445,
  'Name': '绝对值',
  'PersonalScore': 4,
  'PersonalFullScore': 74,
  'PersonalRate': 0.0541,
  'ClassScore': 16,
  'ClassFullScore': 2186,
  'ClassRate': 0.0073
}, {
  'QuestionId': 0,
  'Id': 11444,
  'Name': '相反数',
  'PersonalScore': 0,
  'PersonalFullScore': 10,
  'PersonalRate': 0,
  'ClassScore': 0,
  'ClassFullScore': 310,
  'ClassRate': 0
}, {
  'QuestionId': 0,
  'Id': 4126,
  'Name': '单项式',
  'PersonalScore': 12,
  'PersonalFullScore': 12,
  'PersonalRate': 1,
  'ClassScore': 36,
  'ClassFullScore': 36,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4375,
  'Name': '正方体的展开图',
  'PersonalScore': 0,
  'PersonalFullScore': 65,
  'PersonalRate': 0,
  'ClassScore': 0,
  'ClassFullScore': 1365,
  'ClassRate': 0
}, {
  'QuestionId': 0,
  'Id': 730,
  'Name': '数轴',
  'PersonalScore': 0,
  'PersonalFullScore': 20,
  'PersonalRate': 0,
  'ClassScore': 0,
  'ClassFullScore': 620,
  'ClassRate': 0
}, {
  'QuestionId': 0,
  'Id': 1812,
  'Name': '一元一次方程的应用',
  'PersonalScore': 58,
  'PersonalFullScore': 58,
  'PersonalRate': 1,
  'ClassScore': 332,
  'ClassFullScore': 348,
  'ClassRate': 0.9540
}, {
  'QuestionId': 0,
  'Id': 4481,
  'Name': '几何截面',
  'PersonalScore': 0,
  'PersonalFullScore': 60,
  'PersonalRate': 0,
  'ClassScore': 0,
  'ClassFullScore': 360,
  'ClassRate': 0
}, {
  'QuestionId': 0,
  'Id': 4377,
  'Name': '三视图',
  'PersonalScore': 0,
  'PersonalFullScore': 40,
  'PersonalRate': 0,
  'ClassScore': 0,
  'ClassFullScore': 400,
  'ClassRate': 0
}, {
  'QuestionId': 0,
  'Id': 4394,
  'Name': '角平分线的性质与判定',
  'PersonalScore': 14,
  'PersonalFullScore': 14,
  'PersonalRate': 1,
  'ClassScore': 47.7799999713898,
  'ClassFullScore': 56,
  'ClassRate': 0.8532
}, {
  'QuestionId': 0,
  'Id': 4466,
  'Name': '三角形的面积',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 16,
  'ClassFullScore': 16,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 11447,
  'Name': '规律探索(数字类)',
  'PersonalScore': 16,
  'PersonalFullScore': 16,
  'PersonalRate': 1,
  'ClassScore': 56,
  'ClassFullScore': 60,
  'ClassRate': 0.9333
}, {
  'QuestionId': 0,
  'Id': 2174,
  'Name': '规律探索(图形类)',
  'PersonalScore': 0,
  'PersonalFullScore': 4,
  'PersonalRate': 0,
  'ClassScore': 8,
  'ClassFullScore': 12,
  'ClassRate': 0.6667
}, {
  'QuestionId': 0,
  'Id': 4529,
  'Name': '由三视图计算几何体的表面积或体积',
  'PersonalScore': 0,
  'PersonalFullScore': 10,
  'PersonalRate': 0,
  'ClassScore': 0,
  'ClassFullScore': 100,
  'ClassRate': 0
}, {
  'QuestionId': 0,
  'Id': 4132,
  'Name': '幂的乘方',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 16,
  'ClassFullScore': 16,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4525,
  'Name': '函数自变量的取值范围与函数值',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 16,
  'ClassFullScore': 16,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4514,
  'Name': '有理数的乘除法',
  'PersonalScore': 0,
  'PersonalFullScore': 90,
  'PersonalRate': 0,
  'ClassScore': 0,
  'ClassFullScore': 90,
  'ClassRate': 0
}, {
  'QuestionId': 0,
  'Id': 2173,
  'Name': '规律探索(字母类)',
  'PersonalScore': 8,
  'PersonalFullScore': 8,
  'PersonalRate': 1,
  'ClassScore': 24,
  'ClassFullScore': 24,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 2147,
  'Name': '轴对称图形',
  'PersonalScore': 10,
  'PersonalFullScore': 10,
  'PersonalRate': 1,
  'ClassScore': 40,
  'ClassFullScore': 40,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4381,
  'Name': '相交与垂直',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 16,
  'ClassFullScore': 16,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4486,
  'Name': '用含字母的式子表示数',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 12,
  'ClassFullScore': 12,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4138,
  'Name': '同类项',
  'PersonalScore': 8,
  'PersonalFullScore': 8,
  'PersonalRate': 1,
  'ClassScore': 36,
  'ClassFullScore': 36,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4478,
  'Name': '由三视图判断几何体',
  'PersonalScore': 0,
  'PersonalFullScore': 10,
  'PersonalRate': 0,
  'ClassScore': 0,
  'ClassFullScore': 100,
  'ClassRate': 0
}, {
  'QuestionId': 0,
  'Id': 4474,
  'Name': '变量与常量',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 16,
  'ClassFullScore': 16,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4127,
  'Name': '多项式',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 12,
  'ClassFullScore': 12,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4463,
  'Name': '三角形的内外角和',
  'PersonalScore': 0,
  'PersonalFullScore': 4,
  'PersonalRate': 0,
  'ClassScore': 8,
  'ClassFullScore': 16,
  'ClassRate': 0.5
}, {
  'QuestionId': 0,
  'Id': 4128,
  'Name': '代数式',
  'PersonalScore': 4,
  'PersonalFullScore': 12,
  'PersonalRate': 0.3333,
  'ClassScore': 20,
  'ClassFullScore': 36,
  'ClassRate': 0.5556
}, {
  'QuestionId': 0,
  'Id': 4140,
  'Name': '整式的加减运算',
  'PersonalScore': 22,
  'PersonalFullScore': 26,
  'PersonalRate': 0.8462,
  'ClassScore': 74,
  'ClassFullScore': 78,
  'ClassRate': 0.9487
}, {
  'QuestionId': 0,
  'Id': 2127,
  'Name': '三角形中的主要线段',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 16,
  'ClassFullScore': 16,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4167,
  'Name': '一元二次方程的概念',
  'PersonalScore': 12,
  'PersonalFullScore': 12,
  'PersonalRate': 1,
  'ClassScore': 48,
  'ClassFullScore': 48,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4473,
  'Name': '一元二次方程的应用',
  'PersonalScore': 12,
  'PersonalFullScore': 12,
  'PersonalRate': 1,
  'ClassScore': 48,
  'ClassFullScore': 48,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4387,
  'Name': '平行线的性质',
  'PersonalScore': 8,
  'PersonalFullScore': 8,
  'PersonalRate': 1,
  'ClassScore': 32,
  'ClassFullScore': 32,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 4130,
  'Name': '代数式求值',
  'PersonalScore': 10,
  'PersonalFullScore': 10,
  'PersonalRate': 1,
  'ClassScore': 30,
  'ClassFullScore': 30,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 2052,
  'Name': '一次函数的图象和性质',
  'PersonalScore': 8,
  'PersonalFullScore': 8,
  'PersonalRate': 1,
  'ClassScore': 32,
  'ClassFullScore': 32,
  'ClassRate': 1
}, {
  'QuestionId': 0,
  'Id': 976,
  'Name': '等式的基本性质',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 20,
  'ClassFullScore': 24,
  'ClassRate': 0.8333
}, {
  'QuestionId': 0,
  'Id': 4518,
  'Name': '合并同类项',
  'PersonalScore': 4,
  'PersonalFullScore': 4,
  'PersonalRate': 1,
  'ClassScore': 12,
  'ClassFullScore': 12,
  'ClassRate': 1
}])

let data = []
let labels = []
let dataLabels = []
barData.forEach(d => {
  let {PersonalRate, ClassRate, Name} = d
  let p = (PersonalRate * 100).toFixed(1) * 1
  let c = (ClassRate * 100).toFixed(1) * 1
  data.push([PersonalRate, ClassRate])
  labels.push(Name)
  dataLabels.push([p, c])
})

let chartBar = new ChartBar({
  el: document.getElementById('box'),

  // data: [[1, 0.4], [0.3, 0.2], [0.5, 0.7], [0.9, 0.1], [0.9, 0.1], [0.3, 0.2], [0.5, 0.7], [0.9, 0.1], [0.9, 0.1]],
  // ylabels: ['同底数幂的乘法', '积的乘方', '同底数幂的除法', '零指数幂和负整指数幂', '和负整指数幂', '积的乘方', '同底数幂的除法', '零指数幂和负整指数幂', '和负整指数幂'],
  // dataLabels: [[100, 40], [30, 20], [50, 70], [90, '10%'], [90, '10%'], [30, 20], [50, 70], [90, '10%'], [90, '10%']],
  data: data,
  ylabels: labels,
  dataLabels: dataLabels,
  legends: ['张XX', '班级平均']
})
chartBar.bindData({data, ylabels: labels, dataLabels, legends: ['张XX', '班级平均']})
//
// let chartBar = new ChartBar({
//   el: document.getElementById('box'),
//   data: [[1, 0.4], [0.3, 0.2], [0.5, 0.7], [0.9, 0.1]],
//   ylabels: ['同底数幂的乘法', '积的乘方', '同底数幂的除法', '零指数幂和负整指数幂'],
//   dataLabels: [[100, 40], [30, 20], [50, 70], [90, '10%']]
// })

let chartLine = new ChartLine({
  el: document.getElementById('boxLine')
  // data: [[1, 0.4, 0.9, 0.1, 0.3, 1, 0.4, 0.9, 0.1, 0.3], [0, 0.6, 0.7, 0.2, 0.8], [0.3, 0.6], [0.8]],
  // labels: ['第一课时', '积的乘方', '同底数幂的除法', '零指数幂和负整指数幂', '第五课时', '第五课时', '第五课时', '第五课时', '第五课时', '第五课时', '第五课时', '第五课时'],
  // legends: ['张XX', '班级平均']
})

chartLine.bindData({
  data: [[1, 0.4, 0.9, 0.1, 0.3, 1, 0.4, 0.9, 0.1, 0.3], [0, 0.6, 0.7, 0.2, 0.8], [0.3, 0.6], [0.8]],
  labels: ['第一课时', '积的乘方', '同底数幂的除法', '零指数幂和负整指数幂', '第五课时', '第五课时', '第五课时', '第五课时', '第五课时', '第五课时', '第五课时', '第五课时'],
  legends: ['张XX', '班级平均']
})

window.onresize = function () {
  chartBar.update()
  chartLine.update()
}
