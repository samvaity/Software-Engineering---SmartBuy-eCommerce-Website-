
Chart.defaults.global.responsive = true;
Chart.defaults.global.animation.easing = "easeOutQuart";
Chart.defaults.global.animation.duration = 200;
Chart.defaults.scale.ticks.beginAtZero = true;

var CHART1 = document.getElementById("lineChart");

let lineChart = new Chart(CHART1, {
    type: 'line',
    data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                        {
                            label: "Amount spent in each month 2015",
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
                            data: [65, 59, 80, 81, 56, 55, 40, 40, 30, 10, 20, 10],
                            spanGaps: false,
                        },
                        {
                            label: "Amount spent in each month 2016",
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
                            data: [55, 30, 10, 11, 66, 85, 30, 10, 50, 60, 80, 100],
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

var CHART2 = document.getElementById("barChart");

let barChart = new Chart(CHART2, {
    type: 'bar',
    data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                        {
                            label: "Amount spent in each month 2016",
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
                            data: [55, 30, 10, 11, 66, 85, 30, 10, 50, 60, 80, 100],
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

var CHART3 = document.getElementById("barChart1");

let barChart1 = new Chart(CHART3, {
    type: 'bar',
    data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                        {
                            label: "Amount spent in each month 2015",
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
                            data: [65, 59, 80, 81, 56, 55, 40, 40, 30, 10, 20, 10],
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



var CHART4 = document.getElementById("radarChart");

let radarChart = new Chart(CHART4, {
    type: 'radar',
    data: {
            labels: ["TVs", "Computers", "Cameras", "Cell Phones", "Wearables"],
            datasets: [
                        {
                            label: "Products bought in each categories",
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
                            data: [1, 1, 3, 3, 4],
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

var CHART5 = document.getElementById("radarChart1");

let radarChart1 = new Chart(CHART5, {
    type: 'radar',
    data: {
            labels: ["TVs", "Computers", "Cameras", "Cell Phones", "Wearables"],
            datasets: [
                        {
                            label: "Amount spent in each categories",
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
                            data: [1000, 700, 300, 600, 400],
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




