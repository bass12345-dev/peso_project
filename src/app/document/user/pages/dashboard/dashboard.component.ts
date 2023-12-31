import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})




export class DashboardComponent {
  count : any;
  count_card : any;
  count_doc : any;
 
  displayedColumns: string[] = ['no','tracking_number', 'document_name', 'document_type'];
  id : any;

  count_created_doc : any;
  count_incoming_doc : any;
  count_received_doc : any;
  count_forwarded_doc : any;

  public dataSource = new MatTableDataSource<any>();
  public dataSource1 = new MatTableDataSource<any>();
  public dataSource2 = new MatTableDataSource<any>();

  public dataSourceIncoming = new MatTableDataSource<any>();

  date_now : any;
  
  constructor(
    private apiService :ApiService, 
    public router: Router,
  ){}

  ngOnInit() {
    this.id = localStorage.getItem("id");
    this.Count();
    this.created_document_today();

    const now = new Date();

    this.date_now = now.toLocaleDateString();
    

  }

  Count(){

    this.apiService.CountMyDashboard(this.id).subscribe((items: any) => {

      
      
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


  created_document_today(){

    this.apiService.GetTransactionToday(this.id).subscribe((items: any) => {
      this.dataSource = items.created_today;
      this.dataSource1 = items.received_today;
      this.dataSource2 = items.forwarded_today;
      this.dataSourceIncoming = items.incoming_today;

      this.count_created_doc = items.created_today.length;
      this.count_incoming_doc = items.incoming_today.length;
      this.count_received_doc = items.received_today.length;
      this.count_forwarded_doc = items.forwarded_today.length;
      


      
    })
    
  }


  


}
