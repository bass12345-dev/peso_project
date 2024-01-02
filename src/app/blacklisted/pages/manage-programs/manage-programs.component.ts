import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-programs',
  templateUrl: './manage-programs.component.html',
  styleUrls: ['./manage-programs.component.css']
})
export class ManageProgramsComponent {

  title = 'Manage Programs';
  program : string = ' ';
  button_dis : boolean = false;
  spinner : boolean = true;
  displayedColumns: string[] = ['type', 'created','action'];
  dataSource : string[] = [];
  showLoading : boolean = false;
  text_label_input : string = 'Add';
  cancel_update_btn : boolean = true;
  program_id : any;

  
constructor(
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ){
  }

  ngOnInit(){
    this.getTypes()
  }

  update_type(id : any,type:any){

    this.text_label_input = 'Update';
    this.cancel_update_btn = false;
    this.program = type;
    this.program_id = id;

  }

  cancel_update_click(){

    this.text_label_input = 'Add';
    this.cancel_update_btn = true;
    this.program = '';
    this.program_id = undefined;
   
  }

  getTypes(){
    this.apiService.getTypes().subscribe((items: any[]) => {
      this.dataSource = items;
      this.showLoading = true;
    });
  }

  delete(type_id : any){
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete this type",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showLoading = false;
        Swal.fire({
          title: 'Deleting...',
          html: 'Please wait...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        });
        this.apiService.delete_type(type_id).subscribe((data : any) =>{
          

          if(data.response){
            Swal.close();
            var style = 'custom-style-success';
            this.alert_(data.message,style);
            this.getTypes();
            this.showLoading = true;
          }else {
            Swal.close();
            this.showLoading = true;
            var style = 'custom-style-danger';
            this.alert_(data.message,style);
          }
        });

      }
    });

  }

  submit(){
    this.button_dis = true;
    this.spinner = false;

    let params =  {
      type: this.program,
    }


    
    if(this.program_id == undefined ){
      this.add_type(params);
    }else {
      this.update_type_backend(this.program_id,params);
    }

    




  }

  update_type_backend(type_id : any,params:any){


    this.apiService.update_type(type_id,params).subscribe((data : any) =>{
      if(data.response){
        var style = 'custom-style-success';
        this.alert_(data.message,style);
        this.button_dis = false;
        this.spinner = true;
        this.program = ' ';
        this.getTypes();
      }else {
        var style = 'custom-style-danger';
          this.alert_(data.message,style);
        this.button_dis = false;
        this.spinner = true;
      }

      this.text_label_input = 'Add';
      this.cancel_update_btn = true;
      this.program = '';
      this.program_id = undefined;
    })


  }


  add_type(params:any){
    if(this.program == ' '){
      alert('Please Fill Up')
      this.button_dis = false;
      this.spinner = true;
    }else if(this.program != ' ') {
      
      this.apiService.addType(params).subscribe((data : any) =>{
        if(data.response){
          var style = 'custom-style-success';
          this.alert_(data.message,style);
          this.button_dis = false;
          this.spinner = true;
          this.program = ' ';
          this.getTypes();
        }else {
          var style = 'custom-style-danger';
          this.alert_(data.message,style)
          this.button_dis = false;
          this.spinner = true;
        }
      })

    }
  }

  alert_(message:any,style : string){

    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 700,
      panelClass: [style]
     
    });
  }


}
