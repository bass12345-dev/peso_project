import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css']
})
export class DashboardChartsComponent {


  limit_year : number = 2050;
  year = Array();
  attrib : any;
  data_per_year : any;

  year_now : number = new Date().getFullYear();
  processing_text : boolean = true;
    

  constructor(
    private apiService : ApiService, 
    public router: Router){
}

ngOnInit() {

  for (let index = 2023; index <= this.limit_year; index++) {
    this.year.push(index);
    
  }
  this.load_document_data_per_year(this.year_now);
}

load_per_year(event : any){

  if(this.data_per_year) {
    this.data_per_year.destroy();
}
this.processing_text = false;
  this.load_document_data_per_year(event.target.value)

}

load_document_data_per_year(year:any){
  this.processing_text = false;
  this.apiService.DataPerYearDocument(year).subscribe((data:any)=> {
    this.processing_text = true;
    this.data_per_year = new Chart('myChart1', {
      type: 'bar',
      data: {
         labels: data.label,
         datasets: [{
            label: 'Completed Transactions',
            backgroundColor: "rgb(5, 176, 133)",
            borderColor: 'rgb(23, 125, 255)',
            data: data.completed
         }, {
            label: 'Pending Transactions',
            backgroundColor: 'rgb(216, 88, 79)',
            borderColor: 'rgb(23, 125, 255)',
            data: data.pending
         }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
   });


  });
    
 }

}
