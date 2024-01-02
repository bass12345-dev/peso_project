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
  displayedColumns: string[] = ['program', 'program_description', 'created','action'];
  dataSource : string[] = [];
  showLoading : boolean = false;
  text_label_input : string = 'Add';
  cancel_update_btn : boolean = true;
  program_id : any;
  program_description : string = '';

  
constructor(
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ){
  }

  ngOnInit(){
    this.getPrograms()
  }

  update_type(id : any,program:any, program_description : any){

    this.text_label_input = 'Update';
    this.cancel_update_btn = false;
    this.program = program;
    this.program_description = program_description;
    this.program_id = id;

  }

  cancel_update_click(){

    this.text_label_input = 'Add';
    this.cancel_update_btn = true;
    this.program = '';
    this.program_id = undefined;
   
  }

  getPrograms(){
    this.apiService.getPrograms().subscribe((items: any[]) => {
      this.dataSource = items;
      this.showLoading = true;
    });
  }

  delete(program_id : any){
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
        this.apiService.delete_program(program_id).subscribe((data : any) =>{
          

          if(data.response){
            Swal.close();
            var style = 'custom-style-success';
            this.alert_(data.message,style);
            this.getPrograms();
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
      program             : this.program,
      program_description : this.program_description
    }


    
    if(this.program_id == undefined ){
      this.add_program(params);
    }else {
      this.update_type_backend(this.program_id,params);
    }

    




  }

  update_type_backend(type_id : any,params:any){


    this.apiService.update_program(type_id,params).subscribe((data : any) =>{
      if(data.response){
        var style = 'custom-style-success';
        this.alert_(data.message,style);
        this.button_dis = false;
        this.spinner = true;
        this.program = ' ';
        this.program_description = ' ';
        this.getPrograms();
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


  add_program(params:any){
    if(this.program == ' '){
      alert('Please Fill Up')
      this.button_dis = false;
      this.spinner = true;
    }else if(this.program != ' ') {
      
      this.apiService.addProgram(params).subscribe((data : any) =>{
        if(data.response){
          var style = 'custom-style-success';
          this.alert_(data.message,style);
          this.button_dis = false;
          this.spinner = true;
          this.program = ' ';
          this.program_description = ' ';
          this.getPrograms();
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
