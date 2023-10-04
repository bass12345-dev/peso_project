import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {

  id : any;
  constructor(
    private location: Location, 
    private route: ActivatedRoute,
    private apiService : ApiService, 
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiService.check_person(this.id).subscribe((item: any) => {
      if(item == 0) {
       
        this.back();
      }

    })
   
  }

  
  
  back() {
    this.location.back(); 
  }

}
