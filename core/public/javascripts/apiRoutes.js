const baseURL = "http://localhost:3000"

const NewsAPI = require("newsapi")
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)

class DATAHandler {
  constructor(baseURL) {
    this.BASE_URL = baseURL
  }
  postProjectTitle(inputTitle) {
    return axios.post(`${baseURL}/api/addProject`, inputTitle).then(response => {
      return response
    })
  }
  postNewTask(formData) {
    return axios.post(`${baseURL}/api/addTask`, formData).then(response => {
      return response
    })
  }
}

// router.get("/api/project", (req, res, next) => {
//   Project.find().then(data => res.json(data))
// })

// // NewsAPI for the widget
// router.get("/api/news", (req, res, next) => {
//   newsapi.v2
//     .topHeadlines({
//       category: "general",
//       country: "us"
//     })
//     .then(response => {
//       res.json(response)
//     })
//     .catch(err => {
//       console.error("Could not fetch news", err)
//     })
// })
