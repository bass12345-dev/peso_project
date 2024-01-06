import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { LottieModule } from 'ngx-lottie';

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.css']
})
export class SearchPersonComponent {

  first_name : string = '';
  last_name : string = '';
  count_text : string = '';
  display_count : string = '';
  displayedColumns: string[] = ['name', 'address', 'email', 'phone_number','action' ];
  dataSource : string[] = [];
  showLoading : boolean = true
  table_dis : boolean = true;
  image_search : boolean = false;


  // This is the option that uses the package's AnimationOption interface  
  options: AnimationOptions = {
    path: '/assets/lottieflow-search-05-000000-easey.json',
  };

  
  constructor(
    private apiService : ApiService, 
    public router: Router){
  }
  ngOnInit() {
  }


  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  search(){

    if(this.first_name == '' && this.last_name == ''){
        alert('Please Fill Up at least one');
    }else {
      let params = {first_name : this.first_name,last_name : this.last_name}
      this.showLoading = false;
      Swal.fire({
        title: 'Searching...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      this.apiService.searchName(params).subscribe((data : any) =>{
        Swal.close();
        this.table_dis = false;
        this.image_search = true;
        this.dataSource =  data;
        this.count_text= data.length <= 1 ?  'Result' : 'Results' ; 
        this.display_count = this.count_text +' '+ data.length;
        this.showLoading = true;
      },  (error) => {                              //Error callback
        Swal.close();
        var message = "Connection Error, Please Try Again";
    
        alert(message)

  
        //throw error;   //You can also throw the error to a global error handler
      });  

    }
   
  }

  view_records(id:string){
      this.router.navigate(['/blacklisted/view/' + id]);

  }



  

}
