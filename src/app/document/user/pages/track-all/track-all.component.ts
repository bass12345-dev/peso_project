import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-all',
  templateUrl: './track-all.component.html',
  styleUrls: ['./track-all.component.css']
})
export class TrackAllComponent {

  tracking_number : any;
  spinner : boolean = true;
  dis : boolean = false;

  constructor( 
    public router: Router,
    ){}
  

  search(){
    this.spinner = false;
    this.dis = true;
    this.router.navigate(['document/user/track/' + this.tracking_number]);
  }


  

}
