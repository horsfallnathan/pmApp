// const ctx = document.getElementById('dashboardChart').getContext('2d');
// const printCharts = (label, data) => {
//     const myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: label,
//             datasets: [
//                 {
//                     label: 'Project Standing',
//                     data: data
//                 }
//             ]
//         }
//     });
// };

// const getDashboardData = ({ _id }) => {};

// For Autocomplete

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.autocomplete');
//     data = axios.get(`/getUsers`).then(data => {
//         return data;
//     });
//     console.log(data);
//     var instances = M.Autocomplete.init(elems, data);
// });

// const searchCoinData = (aNewFromDate = '2013-09-01', aNewToDate = '2013-09-05') => {
//     axios
//         .get(`/getTasks`)
//         .then(response => {
//             console.log(response);
//             // myData = response.data;
//             // const label = Object.keys(myData.bpi);
//             // const data = Object.values(myData.bpi);
//             // printCharts(label, data);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
// searchCoinData();

const baseURL = "http://localhost:3000"
class DATAHandler {
    constructor(baseURL) {
        this.BASE_URL = baseURL;
    }
    postProjectTitle(inputTitle) {
        return axios.post(`${baseURL}/api/addProject`, inputTitle).then(response => {
            return response;
        });
    }
    postNewTask(formData) {
        return axios.post(`${baseURL}/api/addTask`, formData).then(response => {
            return response;
        });
    }
}
