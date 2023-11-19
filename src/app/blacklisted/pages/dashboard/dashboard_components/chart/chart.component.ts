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
   
    
    constructor(
        private apiService : ApiService, 
        public router: Router){
      }

  ngOnInit() {
 for (let index = 2023; index <= this.limit_year; index++) {this.year.push(index);}
 
 this.load_per_barangay();
 }


 load_per_year(event:any){

    let year = event.target.value;

    try {
        
   

    this.apiService.DataPerYearWatchlisted(year).subscribe((data:any)=> {

    
        var  chart = new Chart("myChart1", {
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
        
     
    });

} catch (error) {
        
}



   

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
