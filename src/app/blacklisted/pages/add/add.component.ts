import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataSource } from 'src/app/source/data-source';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  barangay : any;

  constructor(
    private apiService : ApiService, 
    public router: Router){
  }
 
  ngOnInit(){
    let d = new DataSource;
    this.barangay = d.barangay;
  }

}
