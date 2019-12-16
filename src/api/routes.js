var router = require("express").Router()
var db = require("../../db")

// Catch all requests here
router.use(function(req, res, next) {
  console.log("Request detected")
  next()
})

module.exports = router
