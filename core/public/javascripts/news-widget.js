let description = []
let titles = []
let articleNumber = 0
let jsonInfo

const getNews = () => {
  axios.get(`/api/news`).then(response => {
    const data = response.data.articles
    jsonInfo = response.data.articles
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
  if (articleNumber > 19) {
    articleNumber = 0
  }
}, 5000)

getNews()

// news ticker
$("#ticker").breakingNews({
  source: {
    type: "json",
    url: "http://localhost:3000/api/news",
    limit: 10,
    showingField: "response",
    linkEnabled: false,
    target: "_blank",
    seperator: '<span class="bn-seperator" style="background-image:url(img/cnn-logo.png);"></span>',
    errorMsg: "Json file not loaded. Please check the settings."
  }
})

$("#ticker").breakingNews({
  effect: "typography"
})

$("#ticker").breakingNews({
  position: "fixed-bottom"
})

$("#ticker").breakingNews({
  height: 40,
  fontSize: "default",
  themeColor: "default",
  background: "default",
  borderWidth: 1,
  radius: 2,
  zIndex: 99999
})

$("#ticker").breakingNews({
  // or "rtl"
  direction: "ltr",

  // enable autoplay
  play: true,

  // autoplay interval
  delayTimer: 4000,

  // animation speed
  scrollSpeed: 2,

  // pause on hover
  stopOnHover: true
})
