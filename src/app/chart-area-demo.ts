import * as CanvasJS from "../../node_modules/canvasjs/dist/canvasjs.min";

export class ChartAreaDemo {

  monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ];
                
  private getDataPointsForChart(selectedYear, listOfDateToBookCount){
     var dataPoint = [];
     var index = 0;
     //console.log(listOfDateToBookCount);
     //console.log(typeof(listOfDateToBookCount));
     for(var i=0; i<listOfDateToBookCount.length; i++){
        if(listOfDateToBookCount[i].Date.getFullYear() == selectedYear){
          dataPoint[index] = {label: this.monthNames[listOfDateToBookCount[i].Date.getMonth()], y: listOfDateToBookCount[i].ReadCount};
          index ++;
       }
    }
     
    //console.log(dataPoint);
    return dataPoint;
  }

  private getDataPointsForPieChart(selectedYear, listOfDateToBookCount){
    var dataPoint = [];
    var index = 0;
    //console.log(listOfDateToBookCount);
    //console.log(typeof(listOfDateToBookCount));
    for(var i=0; i<listOfDateToBookCount.length; i++){
       if(listOfDateToBookCount[i].Date.getFullYear() == selectedYear){
         dataPoint[index] = {y: listOfDateToBookCount[i].ReadCount, name: this.monthNames[listOfDateToBookCount[i].Date.getMonth()]};
         index ++;
      }
   }
    
   //console.log(dataPoint);
   return dataPoint;
 }

  public displayChart(elementToDisplayChart, selectedYear, listOfDateToBookCount): any{
    //console.log(listOfDateToBookCount);
    var chartData = this.getDataPointsForChart(selectedYear, listOfDateToBookCount);
    if(chartData.length > 0){
      //console.log(listOfDateToBookCount);
      var myChart = new CanvasJS.Chart(elementToDisplayChart, {
        title: {
          text: "Chart 1"
        },
        axisX:{  
          //Try Changing to MMMM
          valueFormatString: "MMM"
        },

        // axisY: {
        //     // valueFormatString: "0.0#"
        // },
        
        data: [
          {        
            type: "column",
            dataPoints: chartData 
          }
        ]
      });
    }
    else{
      return null;   
    }

    return myChart;

  }


  public displayPieChart(elementToDisplayChart, selectedYear, listOfDateToBookCount): any{
    //console.log(listOfDateToBookCount);
    var chartData = this.getDataPointsForPieChart(selectedYear, listOfDateToBookCount);
    if(chartData.length > 0){
      //console.log(listOfDateToBookCount);
      var myChart = new CanvasJS.Chart(elementToDisplayChart, {
        title: {
          text: "Chart 2"
        },
        axisX:{  
          //Try Changing to MMMM
          valueFormatString: "MMM"
        },
        
        data: [
          {        
            type: "pie",
            //showInLegend: true,
            toolTipContent: "{name}: <strong>{y}%</strong>",
            indexLabel: "{name} - {y}%",
            dataPoints: chartData 
          }
        ]
      });
    }
    else{
      return null;   
    }

    return myChart;

  }
}
