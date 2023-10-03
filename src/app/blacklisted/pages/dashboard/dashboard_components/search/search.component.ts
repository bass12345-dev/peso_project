import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  first_name : string = '';
  last_name : string = '';
  count_text : string = '';
  display_count : string = '';
  displayedColumns: string[] = ['name', 'address', 'email', 'phone_number','action' ];
  dataSource : string[] = [];
  showLoading : boolean = true
  constructor(
    private apiService : ApiService, 
    public router: Router){
  }
  ngOnInit() {
  }

  search(){
    let params = {first_name : this.first_name,last_name : this.last_name}
      this.showLoading = false;
      this.apiService.searchName(params).subscribe((data : any) =>{
        this.dataSource =  data;
        this.count_text= data.length <= 1 ?  'Result' : 'Results' ; 
        this.display_count = this.count_text +' '+ data.length;
        this.showLoading = true;
      });  
  }

  view_records(id:string){

  }

}
