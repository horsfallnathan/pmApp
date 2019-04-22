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

// const searchCoinData = (aNewFromDate = '2013-09-01', aNewToDate = '2013-09-05') => {
//     axios
//         .get(
//             `https://api.coindesk.com/v1/bpi/historical/close.json?start=${aNewFromDate}&end=${aNewToDate}`
//         )
//         // axios
//         //       .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
//         .then(response => {
//             myData = response.data;
//             const label = Object.keys(myData.bpi);
//             const data = Object.values(myData.bpi);
//             printCharts(label, data);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
// searchCoinData();
