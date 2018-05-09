import pieChart from './index'
pieChart(document.querySelector('.chart-pie'), [
  {
    "dimension_id": "12",
    "dimension_name": "1单",
    "weight":10
  },
  {
    "dimension_id": "36",
    "dimension_name": "2单",
    "weight":30
  },
  {
    "dimension_id": "60",
    "dimension_name": "3单",
    "weight":20
  },
  {
    "dimension_id": "60",
    "dimension_name": "4单",
    "weight":10
  },
  {
    "dimension_id": "60",
    "dimension_name": "5单",
    "weight":10
  },
  {
    "dimension_id": "60",
    "dimension_name": "6单",
    "weight":20
  }
])
