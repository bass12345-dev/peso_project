import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/service/api.service';
Chart.register(...registerables);

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




var myChart = new Chart("myChart1", {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# per year',
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
                'rgba(255, 99, 132, 1)',
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
            y: {
                beginAtZero: true
            }
        }
    }
 });

 
 for (let index = 2023; index < this.limit_year; index++) {
    
    this.year.push(index);
    
 }

 

 this.load_per_barangay();
 }


 load_per_year(event:any){


    console.log(event.target.value)
    
    // this.apiService.DataPerYearWatchlisted().subscribe((data:any)=> {


    // })

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
