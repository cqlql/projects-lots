const fs = require('fs')
const express = require('express')
const dataUrls = require('./data-urls')
const router = express.Router()

function getJson (req, res) {
  const fileName = dataUrls[req.url]
  if (fileName === undefined) {
    res.sendStatus(404)
  } else {
    fs.readFile(`${__dirname}/data/${dataUrls[req.url]}.json`, 'utf8', function (err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data)
      }
    })
  }
}

router.post('/*', getJson)
router.get('/*', getJson)

module.exports = router
