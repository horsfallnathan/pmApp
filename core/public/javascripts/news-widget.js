/* let description = []; */
/* let articleNumber = 0; */

let titles = []
let articlesDiv

const getNews = () => {
  axios.get(`/api/news`).then(response => {
    const data = response.data.articles
    console.log(data)

    data.forEach(article => {
      /* description.push(article.description); */
      titles.push(article.title)
    })
  })
}
getNews()

// alternative ticker
/* setInterval(() => {
  let newStoryHTML = `
      <li id=news-widget>
        <p>${titles[articleNumber]}<p>
        <p>${description[articleNumber]}</p>
      </li>
      `;

  document.getElementById("newsArticleInput").innerHTML = "";
  document.getElementById("newsArticleInput").innerHTML += newStoryHTML;
  articleNumber++;
  if (articleNumber > 19) {
    articleNumber = 0;
  }
}, 5000)
*/

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

setTimeout(() => {
  // for (let i = 0; i < 20; i++) {}
  articlesDiv = `<div class="breaking-news-ticker" id="ticker">
  <div class="bn-label">News:</div>
  <div class="bn-news">
    <ul>
      <li><a href="#">${titles[0]}</a></li>
      <li><a href="#">${titles[1]}</a></li>
      <li><a href="#">${titles[2]}</a></li>
      <li><a href="#">${titles[3]}</a></li>
      <li><a href="#">${titles[4]}</a></li>
      <li><a href="#">${titles[5]}</a></li>
      <li><a href="#">${titles[6]}</a></li>
      <li><a href="#">${titles[7]}</a></li>
      <li><a href="#">${titles[8]}</a></li>
      <li><a href="#">${titles[9]}</a></li>
      <li><a href="#">${titles[10]}</a></li>
      <li><a href="#">${titles[11]}</a></li>
      <li><a href="#">${titles[12]}</a></li>
      <li><a href="#">${titles[13]}</a></li>
      <li><a href="#">${titles[14]}</a></li>
      <li><a href="#">${titles[15]}</a></li>
      <li><a href="#">${titles[16]}</a></li>
      <li><a href="#">${titles[17]}</a></li>
      <li><a href="#">${titles[18]}</a></li>
      <li><a href="#">${titles[19]}</a></li>
    </ul>
  </div>
  <div class="bn-controls">
    <button><span class="bn-arrow bn-prev"></span></button>
    <button><span class="bn-action"></span></button>
    <button><span class="bn-arrow bn-next"></span></button>
  </div>
</div>`
}, 1900)

setTimeout(() => {
  document.getElementById("news-div").innerHTML += articlesDiv
  $("#ticker").breakingNews()
}, 2000)

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
