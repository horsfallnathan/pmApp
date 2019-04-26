const ctx = document.getElementById('dashboardChart').getContext('2d');
const printCharts = (label, perData) => {
    console.log(perData);
    // const myChart = new Chart(ctx, {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Todo', 'Ongoing', 'Completed'],
    //         datasets: [
    //             {
    //                 data: perData2,
    //                 backgroundColor: ['#1c2541', '#3a506b', '#5bc0be']
    //             }
    //         ]
    //     },
    //     options: {
    //         legend: {
    //             display: true,
    //             labels: {
    //                 // fontColor: 'rgb(255, 99, 132)'
    //             }
    //         }
    //     }
    // });
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Todo', 'Ongoing', 'Completed'],
            datasets: [
                {
                    data: perData2[0],
                    backgroundColor: ['#1c2541', '#3a506b', '#5bc0be']
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
            console.log(tasksData[0]);
            sortAndWeigh(tasksData);
            findTotalPercentage(weights);
            eachProjectData(tasksData);
            findEachTotalPercentage(arr);
            arraySum(arr);
            // console.log(perData);
            console.log(arr, ':Arrrrrrr hreree');
            console.log(perData2, ':perData2222222 hreree');
            // console.log(perData, perData2);

            console.log(weights, ':weights hreree');
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
let perData2 = [];
// Use for individual Projects!!!!!!!!!!!!
function findEachTotalPercentage(arr) {
    console.log(arr);
    arr.map(el => el).forEach(function(el) {
        let sum = el.map(el => el).reduce((a, b) => a + b);
        let b = el.map(el => (el / sum) * 100);
        console.log(sum, 'summmmmmmmm');
        perData2.push(b);
    });
}

function arraySum(i) {
    console.log('started');
    var sum = []; // missing var added
    for (var a = 0; a < i.length; a++) {
        // missing var added
        if (typeof i[a] == 'number') {
            sum.push(i[a]);
        } else if (i[a] instanceof Array) {
            sum.push(arraySum(i[a]));
        }
    }
    console.log(sum, 'sumoooooo');
}

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

// function findEachTotalPercentage(arr) {
//     let sum = [];
//     arr.map(el => el).forEach(el => {
//         sum.push(el.reduce((a, b) => a + b, 0));
//     });
//     console.log(sum, 'summmmmmm');
//     // let sum2 = sum.reduce((a, b) => a + b, 0);
//     // perData2.push(sum.map(el => (el / sum2) * 100));
//     // return arr.map(arr => {
//     //     let sum = arr[0][0] + arr[1][0] + arr[2][0];
//     //     perData2.push(arr.map(arr => (arr[0] / sum) * 100));
//     // });
// }

// }

const weights = {
    Ongoing: [],
    Todo: [],
    Completed: []
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

//
const arr = [];
function eachProjectData(projects) {
    projects.forEach(project => {
        const tasks = [];
        tasks.push(project.tasks.filter(el => el.status === 'Todo').map(el => el.weight));
        tasks.push(project.tasks.filter(el => el.status === 'Ongoing').map(el => el.weight));
        tasks.push(project.tasks.filter(el => el.status === 'Completed').map(el => el.weight));
        arr.push(tasks);
    });
}

$(document).ready(function() {
    $('select').formSelect();
});
