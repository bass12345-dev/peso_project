import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { forEach } from 'jszip';
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
  spinner : boolean = true;
  programs : any;
  program_content : boolean = true;
  loader_program_content = false;
  button_dis : boolean = false;
  show_programs : any;

  constructor(private route: ActivatedRoute,private apiService : ApiService, public router: Router,  private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.get_person_data();
    this.get_programs()
 }
 
  get_person_data(){
   
    this.apiService.getPersonData(this.id).subscribe((item: any) => {
      this.person = item;
      var str = item.status
      var str2 = str.charAt(0).toUpperCase() + str.slice(1);
      this.status = str2;
    });
  
  }

  get_programs(){
    this.apiService.get_person_programs(this.id).subscribe((items: any[]) => {
        
        if(items.length > 0){
         
          this.programs = items;
          this.program_content = false;
          this.loader_program_content = true;

          const arr = Array();

          for (let index = 0; index < items.length; index++) {
            if(items[index].x == true){
              arr.push(items[index]);
            }
            
          }
         

          this.show_programs = arr;
          

        }else {
          this.program_content = true;
        
          this.loader_program_content = false;
        }
        
    });
  }


select_multi_program(){
  
  this.button_dis = true;
    this.spinner = false;
  var selectedValues= new Array();
  $('input[name=multi_items]:checked').map(function() {
   selectedValues.push($(this).val());
 });

    let params = {
      id : selectedValues,
      person_id : this.id
    }

  this.apiService.save_programs(params).subscribe((data: any) => {
    
    if(data.response){
      var style = 'custom-style-success';
      this.alert_(data.message,style);
      this.button_dis = false;
      this.spinner = true;
      this.get_programs()

    }else {

      var style = 'custom-style-danger';
      this.alert_(data.message,style);
      this.button_dis = false;
      this.spinner = true;

    }
    
  },  (error) => {                              //Error callback
        
    var message = "Connection Error, Please Try Again";
    this.button_dis = false;

    this.spinner = true;
    alert(message)

    //throw error;   //You can also throw the error to a global error handler
  });
  
}

alert_(message:any, style : any){

  this._snackBar.open(message, '', {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 5 * 700,
    panelClass: [style]
   
  });
}

  
update(){
  this.router.navigate(['/blacklisted/update/' + this.id]);
}
}






