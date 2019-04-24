const ctx = document.getElementById('dashboardChart').getContext('2d');
const printCharts = () => {
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Todo', 'Ongoing', 'Completed'],
            datasets: [
                {
                    data: [10, 20, 30]
                }
            ]
        }
    });
};
printCharts();

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

// Data for Chart
// let tasksData = [];
const getChartData = () => {
    console.log(`starting axios request`);
    axios
        .get(`${baseURL}/api/allProjectStatus`)
        .then(response => {
            const tasksData = response.data;
            console.log(tasksData);
            sortAndWeigh(tasksData);
        })
        .catch(err => {
            console.log(err);
        });
};

getChartData();

// Data calculation Functions

function findPercentage(array) {
    let sum = array.reduce((a, b) => a + b);
    console.log(array.map(el => ((el / sum) * 100).toFixed(2)));
}

// let projectIdArray = [];
// let taskArray = [];
// let ongoingArray = [];
// let todoArray = [];
// let completedArray = [];
// function sortAndWeigh(array) {
//     array.map((el, i) => {
//         if (projectIdArray.includes(el.project)) {
//         } else {
//             projectIdArray.push(el.project);
//             taskArray[i] = [];
//             ongoingArray[i] = [];
//             todoArray[i] = [];
//             completedArray[i] = [];
//         }
//     });
//     for (let i = 0; i < projectIdArray.length; i++) {
//         array.map(el => {
//             console.log(el.status);
//             if (el.name === projectIdArray[i] && el.status == 'Ongoing') {
//                 ongoingArray[i].push(el.weight);
//                 console.log('got here');
//             }
//             if (el.name === projectIdArray[i] && el.status == 'Todo') {
//                 todoArray[i].push(el.weight);
//             }
//             if (el.name === projectIdArray[i] && el.status == 'Completed') {
//                 completedArray[i].push(el.weight);
//             }
//         });
//     }
//     console.log(
//         projectIdArray,
//         'projectIdArray',
//         taskArray,
//         ':taskArray',
//         ongoingArray,
//         ':ongoingArray',
//         todoArray,
//         ':todoArray',
//         completedArray,
//         ':completedArray'
//     );
// }
