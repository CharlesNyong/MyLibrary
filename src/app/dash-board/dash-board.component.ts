import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { rejects } from 'assert';
import { stringify } from 'querystring';
import { AuthenticationService } from '../authentication.service';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ChartAreaDemo } from '../chart-area-demo';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit, AfterViewInit {

  chartAreaObj: ChartAreaDemo;
  bookServices: BookService;
  readBooks : Book[];
  monthsToBooksList : any[];
  yearsOfBooks : string[];
  selectedYear : any;
  chartExist : boolean;
  authenticationService: AuthenticationService;

  constructor(bookServices:BookService, authenticationService: AuthenticationService) {
    this.chartAreaObj = new ChartAreaDemo();
    this.bookServices = bookServices;
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
    this.bookServices.getMonthsToRead().then((res) =>{
      this.yearsOfBooks = this.getAllYears(this.bookServices.monthsToReadCounts);
      console.table(this.yearsOfBooks);
      this.selectedYear = this.yearsOfBooks[0];
      var areaChartObj = this.chartAreaObj.displayChart("myAreaChart", this.selectedYear, this.bookServices.monthsToReadCounts);
      var barChartObj = this.chartAreaObj.displayPieChart("myBarChart", this.selectedYear, this.bookServices.monthsToReadCounts);
      if(areaChartObj != null){
        areaChartObj.render();
      }
      else{
        document.getElementById("myAreaChart").innerHTML = "<div class='missingAreaChart'><h5>YOU HAVE NO READING HISTORY/RECORDS!</h5></div>";
      }

      if(barChartObj != null){
        barChartObj.render();
      }
      else{
        document.getElementById("myBarChart").innerHTML = "<div class='missingAreaChart'><h5>YOU HAVE NO READING HISTORY/RECORDS!</h5></div>";
      }
    });

    this.chartExist = true;
  }

  // event fired after dashboard view is initialized
  ngAfterViewInit(): void {
    // console.log(this.readBooks);
    // console.log(this.pendingReads);
    // console.log(this.bookServices.monthsToReadCounts);
    // this.chartAreaObj.displayChart("myAreaChart", this.selectedYear, this.monthsToBooksList).render();
  }

  getAllYears(inputList: any[]): string[]{
      var returnListOfyears = [];
      
      //console.log("in get all years ...");
      for(var i=0; i<inputList.length; i++){
        if(!returnListOfyears.includes(inputList[i].Date.getFullYear())){
          returnListOfyears.push(inputList[i].Date.getFullYear());
        }
      }
      
      //console.log(returnListOfyears);
      return returnListOfyears;
  } 
  
  queryForYear(): void{
    
    var chartObj = this.chartAreaObj.displayChart("myAreaChart", this.selectedYear, this.bookServices.monthsToReadCounts); 
    var barChartObj = this.chartAreaObj.displayPieChart("myBarChart", this.selectedYear, this.bookServices.monthsToReadCounts);
    console.log("chartObj: " + chartObj);
    if(chartObj != null){
      chartObj.render();
    }
    else{
      document.getElementById("myAreaChart").innerHTML = "<div class='missingAreaChart'><b>Oops chart doesn't exist for selected year!</b></div>";
    }

    if(barChartObj != null){
      barChartObj.render();
    }
    else{
      document.getElementById("myBarChart").innerHTML = "<div class='missingAreaChart'><b>Oops chart doesn't exist for selected year!</b></div>";
    }
    
    //alert("selected year: " + this.selectedYear);
  }

}
