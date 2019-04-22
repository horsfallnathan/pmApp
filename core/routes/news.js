const express = require("express")
const router = express.Router()

router.get("/news", (req, res, next) => {
  res.render("signedIn/news")
})

module.exports = router
