import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'peso_project';


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
