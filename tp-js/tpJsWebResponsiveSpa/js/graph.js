
function startGraph(){


var btnDraw = document.getElementById("btnDraw");

btnDraw.addEventListener("click",function(event){
	var ctx = document.getElementById("myChart").getContext('2d');
	var fx = document.getElementById("fx").value;
	var xMin = document.getElementById("xMin").value;
	var xMax = document.getElementById("xMax").value;
	var yMin=0;
	var yMax=0;
	
	//var x=2
	//var y=eval(fx);
	//alert("y=f(x)=" + y);
	var x,y;
	pointValues=[];
	xMin=Number(xMin)*1.0;xMax=Number(xMax)*1.0;
	var n=100;
	var dx=(xMax-xMin)/n;
	for(x=xMin;x<=xMax;x+=dx){
		   y=eval(fx);
		   if(y<=yMin) yMin=y;
		   if(y>=yMax) yMax=y;
		   pointValues.push({x:x,y:y});
	}
	var dy=(yMax-yMin)/100;
	console.log(pointValues);
	
	var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: 'y=f(x)='+fx,
      data: pointValues,
      borderColor: [
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)'
      ],
      borderWidth: 1
    }],
  },
  options: {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        ticks: {
          min: xMin,
          max: xMax,
          stepSize: dx*10,
          fixedStepSize: dx*10,
        }
      }],
      yAxes: [{
        ticks: {
          min: yMin,
          max: yMax,
          stepSize: dy*10,
          fixedStepSize: dy*10,
        }
      }]
    }
  }
});
	
});

}
/*
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
*/

	/*
	var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: 'Equation Plotted',
      data: [{
        x: 0,
        y: 2
      }, {
        x: 1,
        y: 3
      }, {
        x: 2,
        y: 2
      }, {
        x: 1.02,
        y: 0.4
      }, {
        x: 0,
        y: -1
      }],
      backgroundColor: [
        'rgba(123, 83, 252, 0.8)',
        'rgba(123, 83, 252, 0.8)',
        'rgba(123, 83, 252, 0.8)',
        'rgba(123, 83, 252, 0.8)',
        'rgba(123, 83, 252, 0.8)',
        'rgba(123, 83, 252, 0.8)'
      ],
      borderColor: [
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)',
        'rgba(33, 232, 234, 1)'
      ],
      borderWidth: 1
    }],
  },
  options: {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        ticks: {
          min: -1,
          max: 8,
          stepSize: 1,
          fixedStepSize: 1,
        }
      }],
      yAxes: [{
        ticks: {
          min: -2,
          max: 4,
          stepSize: 1,
          fixedStepSize: 1,
        }
      }]
    }
  }
});*/