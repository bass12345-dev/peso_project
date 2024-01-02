import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/service/api.service';
Chart.register(...registerables);
import * as $ from 'jquery';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

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

//  for (let index = this.year_now + 1; index <= this.limit_year; index++) {
//     this.year.push(index);
    
// }
for (let index = 2023; index <= this.limit_year; index++) {
    this.year.push(index);
    
}
 this.load_per_barangay();
 this.load_chart_per_year(this.year_now);
 }

 load_per_year(event : any){

    if(this.data_per_year) {
        this.data_per_year.destroy();
    }
    
    this.processing_text = false;
    this.load_chart_per_year(event.target.value);
 }





load_chart_per_year(year : any){

    console.log(year)

    
    this.apiService.DataPerYearWatchlisted(year).subscribe((data:any)=> {

     
        this.processing_text = true;
        this.data_per_year =  new Chart('myChart1', {
             type: 'bar',
             data: {
                 labels: data.label,
                 datasets: [{
                     label: '# per year',
                     data: data.active,
                     backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                        
                     ],
                     borderColor: [
                         'rgba(255, 99, 132, 1)',
                         
                     ],
                     borderWidth: 1
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
          


         
    

 })

}

 load_per_barangay(){
    
    this.apiService.DataPerBarangayWatchlisted().subscribe((data:any)=> {

          new Chart("myChart", {
            type: 'bar',
            data: {
                labels: data.label,
                datasets: [{
                    label: '# per barangay',
                    data: data.active,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                       
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        
                    ],
                    borderWidth: 1
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
         

    })
    
 }

}
