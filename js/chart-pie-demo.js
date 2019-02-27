
// Pie Chart 7.0
var ctx = document.getElementById("php7.0");
var myPieChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Warnings", "Skipped", "Incomplete"],
    datasets: [{
      data: [ 14, 13, 13],
      			backgroundColor: ['#74B85D', '#92C780', '#BBDCAF', '#D8EBD2'],
			hoverBackgroundColor: ['#5B854D','#5B854D','#5B854D','#5B854D'],
			hoverBorderColor: 'rgba(234, 236, 244, 1)',
    }],
  },
options: { maintainAspectRatio: false,
		tooltips: 
			{backgroundColor: 'rgb(0,255,255)',
			bodyFontColor:'#858796',
			borderColor: '#dddfeb',
			borderWidth: 1,
			xPadding: 15,
			yPadding: 15,
			displayColors: false,
			caretPadding: 10,
			bodyFontFamily: 'sans-serif',},
			legend: {display: false},
			cutoutPercentage: 60,},
});

// Pie Chart 7.1
var ctx = document.getElementById("php7.1");
var myPieChart2 = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Warnings", "Skipped", "Incomplete"],
    datasets: [{
      data: [12, 11, 13],
      			backgroundColor: ['#74B85D', '#92C780', '#BBDCAF', '#D8EBD2'],
			hoverBackgroundColor: ['#5B854D','#5B854D','#5B854D','#5B854D'],
			hoverBorderColor: 'rgba(234, 236, 244, 1)',
    }],
  },
options: { maintainAspectRatio: false,
		tooltips: 
			{backgroundColor: 'rgb(0,255,255)',
			bodyFontColor:'#858796',
			borderColor: '#dddfeb',
			borderWidth: 1,
			xPadding: 15,
			yPadding: 15,
			displayColors: false,
			caretPadding: 10,
			bodyFontFamily: 'sans-serif',},
			legend: {display: false},
			cutoutPercentage: 60,},
});


// Pie Chart 7.2
var ctx = document.getElementById("php7.2");
var myPieChart3 = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Warnings", "Skipped", "Incomplete"],
    datasets: [{
      data: [12, 11, 13],
      			backgroundColor: ['#74B85D', '#92C780', '#BBDCAF', '#D8EBD2'],
			hoverBackgroundColor: ['#5B854D','#5B854D','#5B854D','#5B854D'],
			hoverBorderColor: 'rgba(234, 236, 244, 1)',
    }],
  },
options: { maintainAspectRatio: false,
		tooltips: 
			{backgroundColor: 'rgb(0,255,255)',
			bodyFontColor:'#858796',
			borderColor: '#dddfeb',
			borderWidth: 1,
			xPadding: 15,
			yPadding: 15,
			displayColors: false,
			caretPadding: 10,
			bodyFontFamily: 'sans-serif',},
			legend: {display: false},
			cutoutPercentage: 60,},
});