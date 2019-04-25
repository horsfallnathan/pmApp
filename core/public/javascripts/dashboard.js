const ctx = document.getElementById('dashboardChart').getContext('2d');
const printCharts = (label, perData) => {
    console.log(perData);
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Todo', 'Ongoing', 'Completed'],
            datasets: [
                {
                    data: perData,
                    backgroundColor: ['#ff8397', '#f38b4a', '#56d798']
                }
            ]
        },
        options: {
            legend: {
                display: true,
                labels: {
                    // fontColor: 'rgb(255, 99, 132)'
                }
            }
        }
    });
};

const getChartData = () => {
    console.log(`starting axios request`);
    axios
        .get(`${baseURL}/api/allProjectStatus`)
        .then(response => {
            const tasksData = response.data;
            console.log(tasksData);
            sortAndWeigh(tasksData);
            findTotalPercentage(weights);
            console.log(perData);
            let label = ['Todo', 'Ongoing', 'Completed'];
            printCharts(label, ...perData);
        })
        .catch(err => {
            console.log(err);
        });
};

getChartData();

// Data calculation Functions
const perData = [];

// Use for individual Projects!!!!!!!!!!!!
// function findPercentage(weights) {
//     let a = Object.values(weights);
//     a.map(el => el).forEach(el => {
//         let sum = el.reduce((a, b) => a + b, 0);
//         let b = el.map(el => ((el / sum) * 100).toFixed(2));
//         console.log(sum);
//         perData.push(b);
//     });
// }

function findTotalPercentage(weights) {
    let a = Object.values(weights);
    let sum = [];
    a.map(el => el).forEach(el => {
        sum.push(el.reduce((a, b) => a + b, 0));
    });
    // console.log(sum);
    let sum2 = sum.reduce((a, b) => a + b, 0);
    perData.push(sum.map(el => (el / sum2) * 100));
}
// }

const weights = {
    Todo: [],
    Completed: [],
    Ongoing: []
};
function sortAndWeigh(project) {
    project
        .map(el => el.tasks)
        .forEach(tasks => {
            tasks.forEach(task => {
                weights[task.status].push(task.weight);
            });
        });
}
