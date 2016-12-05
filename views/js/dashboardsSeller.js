Chart.defaults.global.responsive = true;
Chart.defaults.global.animation.easing = "easeOutQuart";
Chart.defaults.global.animation.duration = 200;
Chart.defaults.scale.ticks.beginAtZero = true;

var SCHART1 = document.getElementById("lineChartSeller");

let lineChartSeller = new Chart(SCHART1, {
    type: 'line',
    data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                        {
                            label: "Amount sold in each month 2015",
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [6500, 5900, 8000, 8100, 5600, 5500, 4000, 4000, 3000, 1000, 2000, 1000],
                            spanGaps: false,
                        },
                        {
                            label: "Amount sold in each month 2016",
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(155,100,2,0.4)",
                            borderColor: "rgba(155,100,2,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [5500, 3000, 1000, 1100, 6600, 8500, 3000, 1000, 5000, 6000, 8000, 10000],
                            spanGaps: false,
                        }
                    ]
            },
            options: {
                scales: {
                    yAxis: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
});


var SCHART2 = document.getElementById("barChartSeller1");

let barChartSeller1 = new Chart(SCHART2, {
    type: 'bar',
    data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                        {
                            label: "Number of products sold in each month 2015",
                            fill: true,
                            lineTension: 0,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [6500, 5900, 8000, 8100, 5600, 5500, 4000, 4000, 3000, 1000, 2000, 1000],
                            spanGaps: false,
                        }
                    ]
            },
            options: {
                scales: {
                    yAxis: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
});

var SCHART3 = document.getElementById("barChartSeller2");

let barChartSeller2 = new Chart(SCHART3, {
    type: 'bar',
    data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                        {
                            label: "Number of products sold in each month 2016",
                            fill: true,
                            lineTension: 0,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [5500, 3000, 1000, 1100, 6600, 8500, 3000, 1000, 5000, 6000, 8000, 10000],
                            spanGaps: false,
                        }
                    ]
            },
            options: {
                scales: {
                    yAxis: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
});







var SCHART4 = document.getElementById("radarChartSeller1");

let radarChartSeller1 = new Chart(SCHART4, {
    type: 'radar',
    data: {
            labels: ["TVs", "Computers", "Cameras", "Cell Phones", "Wearables"],
            datasets: [
                        {
                            label: "Number of products sold in each category",
                            fill: true,
                            lineTension: 0,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [19900, 10000, 300000, 300000, 400000],
                            spanGaps: false,
                        }
                    ]
            },
            options: {
                scales: {
                    yAxis: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
});

var SCHART5 = document.getElementById("radarChartSeller2");

let radarChartSeller2 = new Chart(SCHART5, {
    type: 'radar',
    data: {
            labels: ["TVs", "Computers", "Cameras", "Cell Phones", "Wearables"],
            datasets: [
                        {
                            label: "Revenue generated in each category",
                            fill: true,
                            lineTension: 0,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [10000000, 7000000, 3000000, 6000000, 4000000],
                            spanGaps: false,
                        }
                    ]
            },
            options: {
                scales: {
                    yAxis: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
});
