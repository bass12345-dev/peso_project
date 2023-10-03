import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-active-list',
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.css']
})
export class ActiveListComponent implements OnInit, OnDestroy {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allUsers: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.users();
    this.dtOptions = {
     
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
    
        'copy',
        'print',
        'excel',
    
      ]
    };

  }

  users(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe((response: any) => {
          this.allUsers = response;
          this.dtTrigger.next(response);
        });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
