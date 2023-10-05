import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  
  count_card = [
       
    {
      'title' : 'My Documents',
      'total' :  1,
      'icon'  : 'fa-ban',
      'bgc'  : 'l-bg-cherry'
    },
    {
      'title' : 'Incoming',
      'total' :  1,
      'icon'  : 'fa-plus',
      'bgc'  : 'l-bg-blue-dark'
    },
    {
      'title' : 'Received',
      'total' :  1,
      'icon'  : 'fa-plus',
      'bgc'  : 'l-bg-green-dark'
    },
    {
      'title' : 'Forwarded',
      'total' :  1,
      'icon'  : 'fa-plus',
      'bgc'  : 'l-bg-orange-dark'
    }

    
];

}
