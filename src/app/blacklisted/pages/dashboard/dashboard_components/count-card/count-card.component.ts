import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.css']
})
export class CountCardComponent {

  count_active : any;
  count_inactive : any;
  
  constructor(
    private apiService : ApiService, 
    public router: Router){
  }

  ngOnInit() {this.count();}

  count(){
    this.apiService.count_all().subscribe((items : any) => {
      this.count_active   = items[0].active;
      this.count_inactive = items[0].inactive;
    });
   }

}
