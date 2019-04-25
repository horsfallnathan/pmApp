const express = require('express');
const router = express.Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);

router.get('/news', (req, res, next) => {
    const query = req.query;
    newsapi.v2
        .topHeadlines({
            sources: 'bbc-news, financial-times, nbc-news, cnn, the-new-york-times, the-hill',
            q: query.keyword
        })
        .then(response => {
            res.render('signedIn/news', { response });
        })
        .catch(err => {
            console.error('Error fetching news', err);
        });
});

// NewsAPI for the widget
router.get('/api/news', (req, res, next) => {
    newsapi.v2
        .topHeadlines({
            sources: 'bbc-news, financial-times, nbc-news, cnn, the-new-york-times, the-hill'
        })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.error('Could not fetch news', err);
        });
});

module.exports = router;
