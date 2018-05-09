var express = require('express')
var router = express.Router()

router.get('/GetMessage', function (req, res) {
  res.send({
    'status': 200,
    'message': 'ok',
    'result': {}
  })
})

router.post('/file', function (req, res) {
  res.send({
    'status': 200,
    'message': 'ok',
    'result': {}
  })
})

module.exports = router
