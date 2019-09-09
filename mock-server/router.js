const fs = require('fs')
const express = require('express')
const dataUrls = require('./data-urls')
const router = express.Router()

function getJson (req, res) {
  let fileName = dataUrls[req.url]
  if (fileName === undefined) {
    return res.sendStatus(404)
  }
  fs.readFile(`${__dirname}/data/${dataUrls[req.url]}.json`, 'utf8', function (err, data) {
    if (err) {
      return res.send(err)
    } else {
      res.send(data)
    }
  })
}

router.post('/*', getJson)
router.get('/*', getJson)

module.exports = router
