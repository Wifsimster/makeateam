var router = require("express").Router()
var User = require("../models/user")
var errorHandler = require("./errorHandler")
var multer = require("multer")

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./dist/uploads/")
  },
  filename: function(req, file, cb) {
    var ext = file.originalname.split(".").pop()
    cb(null, "user-" + Date.now() + "." + ext)
  }
})

var uploads = multer({ storage: storage })

// Get all users
router.get("/", function(req, res) {
  User.findAll().then(function(rst) {
    res.json(rst)
  })
})

// Create a user
router.post("/", function(req, res) {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })
    .then(function(rst) {
      res.json(rst)
    })
    .catch(function(err) {
      res.json(errorHandler(err))
    })
})

// Add an avatar to user
router.post("/file/:id", uploads.single("file"), function(req, res) {
  User.findById(req.params.id)
    .then(function(user) {
      if (user) {
        user
          .update({
            image: req.file.filename
          })
          .then(function(rst) {
            res.json(rst)
          })
          .catch(function(err) {
            res.json(errorHandler(err))
          })
      } else {
        res.json(errorHandler({ message: "User not found !" }))
      }
    })
    .catch(function(err) {
      res.json(errorHandler(err))
    })
})

// Get a user
router.get("/:id", function(req, res) {
  User.findById(req.params.id)
    .then(function(user) {
      if (user) {
        res.json(user)
      } else {
        res.json(errorHandler({ message: "User not found !" }))
      }
    })
    .catch(function(err) {
      res.json(errorHandler(err))
    })
})

// Update a user
router.put("/:id", function(req, res) {
  User.findById(req.params.id)
    .then(function(rst) {
      if (rst) {
        rst
          .update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
          })
          .then(function(rst) {
            res.json(rst)
          })
          .catch(function(err) {
            res.json(errorHandler(err))
          })
      } else {
        res.json(errorHandler({ message: "User not found !" }))
      }
    })
    .catch(function(err) {
      res.json(errorHandler(err))
    })
})

// Delete a user
router.delete("/:id", function(req, res) {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(
      function(rowDeleted) {
        if (rowDeleted === 1) {
          res.json({ message: "User deleted" })
        }
      },
      function(err) {
        console.error(err)
      }
    )
    .catch(function(err) {
      res.json(errorHandler(err))
    })
})

module.exports = router
