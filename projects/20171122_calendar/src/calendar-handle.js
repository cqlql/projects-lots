/* eslint-disable */
let baseData = [{
  'title': '会议标题',
  'content': '会议内容',
  'start_time': '2017-01-02 14:26:00',
  'end_time': '2017-01-02 18:26:00',
  'summary': '会议纪要',
  'address': '会议地址',
  'Url': [{    //文件地址
    'type': 1,
    'url': 'www.caidi.com',
    'name': '文件名'
  }, {
    'type': 2,
    'url': 'www.com',
    'name': '文件名'
  }],
  'AR': [{     //审核人列表
    'user_id': 1,
    'user_name': 'gary',
    'sort': 1
  }, {
    'user_id': 2,
    'user_name': '王耿',
    'sort': 2
  }, {
    'user_id': 3,
    'user_name': 'j',
    'sort': 3
  }],
  'NF': [{     //通知人列表
    'user_id': 1,
    'user_name': 'gary'
  }, {
    'user_id': 2,
    'user_name': 'gary'
  }, {
    'user_id': 3,
    'user_name': 'gary'
  }, {
    'user_id': 4,
    'user_name': 'gary'
  }],
  'AS': [{
    'user_id': 1,
    'user_name': 'gary'
  }]
}]

function replace (time) {
  return time.replace(/\s.+/, '').replace(/-/g, '/')
}

export default function (weekDays) {
  baseData.forEach((d, calendarIndex) => {
    let {start_time: sTime, end_time: eTime} = d

    sTime = replace(sTime)
    eTime = replace(eTime)

    weekDays.forEach(d => {
      let {value} = d
      if (value >= sTime && value <= eTime) {
        d.calendarIndex = calendarIndex
      }
    })
  })
}
