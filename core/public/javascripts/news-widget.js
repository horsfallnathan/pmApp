let description = []
let titles = []
let articleNumber = 0

const getNews = () => {
  axios.get(`/api/news`).then(response => {
    const data = response.data.articles
    console.log(data)

    data.forEach(article => {
      description.push(article.description)
      titles.push(article.title)
    })
  })
}

setInterval(() => {
  let newStoryHTML = `
      <li id=news-widget>
        <p>${titles[articleNumber]}<p>
        <p>${description[articleNumber]}</p>
      </li>
      `

  document.getElementById("newsArticleInput").innerHTML = ""
  document.getElementById("newsArticleInput").innerHTML += newStoryHTML
  articleNumber++
  if (articleNumber > 20) {
    articleNumber = 0
  }
}, 5000)

getNews()
