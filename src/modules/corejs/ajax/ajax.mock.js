
function post () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve({
        data: {
          code: 0,
          data: {
            id: '10086'
          }
        }
      })
    }, 300)
  })
}

let axios = {
  post,
  once: {
    post () {
      console.log('此 ajax 必须只能触发一次')
      return post()
    }
  }
}

export default axios
