var express = require('express')
var router = express.Router()
// 文件上传
var multer = require('multer')
var upload = multer({
  dest: 'e:/uploads/'
})

router.post('/UploadImage', upload.single('file'), function (req, res) {
  let file = res.req.file
  console.log(file)

  res.send({
    'code': 0,
    'message': 'ok',
    'data': {
      Url: `http://${require('ip').address()}:3003/uploads/` + file.filename
    }
  })
})

// router.get('/GetMessage', function (req, res) {
//   res.send({
//     'status': 200,
//     'message': 'ok',
//     'result': {}
//   })
// })

module.exports = router
