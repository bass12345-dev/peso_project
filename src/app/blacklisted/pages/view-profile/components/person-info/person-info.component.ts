import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent {

  person : any;
  status : any;
  id : any;
  constructor(private route: ActivatedRoute,private apiService : ApiService, public router: Router) {}

  ngOnInit(): void {
    this.get_person_data();
 }
 
  get_person_data(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiService.getPersonData(this.id).subscribe((item: any) => {
      this.person = item;
      var str = item.status
      var str2 = str.charAt(0).toUpperCase() + str.slice(1);
      this.status = str2;
    });
  
  }

  
update(){
  this.router.navigate(['/blacklisted/update/' + this.id]);
}
}
