const getNews = () => {
  console.log("getting news..")
  axios.get(`/api/news`).then(response => {
    const data = response.data.articles
    console.log(data)

    data.forEach(article => {
      const source = article.source.name
      const title = article.title

      const newStoryHTML = `
      <li id=news-widget>
        <p>${source}</p>
        <p>${title}<p>
      </li>
      `

      document.getElementById("news-list").innerHTML += newStoryHTML
    })
  })
}

getNews()

// const getCharacters = () => {
//   axios.get(`${baseURL}/superheroes`).then(response => {
//     const { data } = response

//     data.forEach(character => {
//       const { id, name, occupation, location } = character

//       const newCharacterHTML = `
//         <li id=${id}>
//             <p>${id}</p>
//             <p>${name}</p>
//             <p>${occupation}</p>
//             <p>${location}</p>
//         </li>
//         `

//       document.getElementById("characters-list").innerHTML += newCharacterHTML
//     })
//   })
// }
