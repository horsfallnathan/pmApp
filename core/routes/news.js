const express = require("express")
const router = express.Router()
const NewsAPI = require("newsapi")
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)

router.get("/news", (req, res, next) => {
  const query = req.query
  newsapi.v2
    .topHeadlines({
      // sources: "bbc-news, financial-times",
      q: query.keyword,
      category: query.category,
      language: "en",
      excludeDomains: "dailymail.co.uk"
      // country: "uk"
    })
    .then(response => {
      // console.log(response.articles[0].url)
      res.render("signedIn/news", { response })
    })
    .catch(err => {
      console.error("Error fetching news", err)
    })
})

module.exports = router
