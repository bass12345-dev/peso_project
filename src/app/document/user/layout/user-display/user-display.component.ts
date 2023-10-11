import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent {

  user : any
  constructor(
    private apiService : ApiService, 
  ) {}

  ngOnInit() {
    this.getUserData();
   }

   getUserData(){
    this.apiService.getUserData(localStorage.getItem("id")).subscribe((item: any) => {
      this.user = item;
      
  });
   }

}
