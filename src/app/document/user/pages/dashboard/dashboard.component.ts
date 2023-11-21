import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  
];



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})




export class DashboardComponent {
  count : any;
  count_card : any;
  count_doc : any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(
    private apiService :ApiService, 
    public router: Router,
  ){}

  ngOnInit() {
    this.Count();

  }

  Count(){

    this.apiService.CountMyDashboard(localStorage.getItem("id")).subscribe((items: any) => {

      
      
    this.count_card = [
       
      {
        'title' : 'My Documents',
        'total' :  items.count_documents,
        'icon'  : 'fa-file',
        'bgc'  : 'l-bg-cherry'
      },
      {
        'title' : 'Incoming',
        'total' :  items.incoming,
        'icon'  : 'fa-arrow-left',
        'bgc'  : 'l-bg-blue-dark'
      },
      {
        'title' : 'Received',
        'total' :  items.received,
        'icon'  : 'fa-arrow-down',
        'bgc'  : 'l-bg-green-dark'
      },
      {
        'title' : 'Forwarded',
        'total' :  items.forwarded,
        'icon'  : 'fa-arrow-up',
        'bgc'  : 'l-bg-orange-dark'
      }    
  ];
  
    });
  }

  


}
