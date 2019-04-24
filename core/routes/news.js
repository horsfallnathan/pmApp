const express = require("express")
const router = express.Router()
const NewsAPI = require("newsapi")
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)

router.get("/news", (req, res, next) => {
  const query = req.query
  newsapi.v2
    .topHeadlines({
      q: query.keyword,
      category: query.category,
      language: "en"
      // sources: "bbc-news, financial-times",
      // country: "gb"
    })
    .then(response => {
      res.render("signedIn/news", { response })
    })
    .catch(err => {
      console.error("Error fetching news", err)
    })
})

module.exports = router
