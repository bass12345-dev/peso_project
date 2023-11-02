import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.css']
})
export class CountCardComponent {

  count_all_documents = 1;
  count_card : any = [];

  constructor(
    private apiService :ApiService, 
    public router: Router,
  ){}


  ngOnInit(){


    this.apiService.CountadminDashboard().subscribe((items: any) => {

      this.count_card = [
              
        {
          'title' : 'All Documents',
          'total' :  items.count_documents,
          'icon'  : 'fa-file',
          'bgc'  : 'l-bg-cherry'
        },
        {
          'title' : 'Offices',
          'total' :  items.count_offices,
          'icon'  : 'fa-building',
          'bgc'  : 'l-bg-blue-dark'
        },
        {
          'title' : 'Types',
          'total' :  items.count_document_types,
          'icon'  : 'fa-file-text',
          'bgc'  : 'l-bg-green-dark'
        },
        {
          'title' : 'Users',
          'total' :  items.count_users,
          'icon'  : 'fa-users',
          'bgc'  : 'l-bg-orange-dark'
        }

        
    ];

    })

          
  }

}
