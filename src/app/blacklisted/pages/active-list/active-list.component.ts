import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-active-list',
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.css']
})
export class ActiveListComponent implements OnInit, OnDestroy {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allUsers: any = [];
  list : any = [];
  constructor(
    private apiService : ApiService, 
    public router: Router){
  }
  ngOnInit(): void {
    
    // this.users();
    this.get_list();
    
    this.dtOptions = {
     
  
      dom: 'Bfrtip',
   
      buttons: [
    
        'copy',
        'print',
        'excel',
    
      ]
    };

  }

  get_list(){
          this.apiService.getList('active').subscribe((items : any = []) => {
            this.list = items;
            this.dtTrigger.next(this.list);
          });
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
