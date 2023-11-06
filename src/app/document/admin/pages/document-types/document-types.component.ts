import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent {

  title = 'Manage Document Types';
  type : string = ' ';
  button_dis : boolean = false;
  spinner : boolean = true;
  displayedColumns: string[] = ['type', 'created','action'];
  dataSource : string[] = [];
  showLoading : boolean = false;
  text_label_input : string = 'Add';
  cancel_update_btn : boolean = true;
  type_id : any;

  
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
    this.type = type;
    this.type_id = id;

  }

  cancel_update_click(){

    this.text_label_input = 'Add';
    this.cancel_update_btn = true;
    this.type = '';
    this.type_id = undefined;
   
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
      text: "Delete this person",
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
      type: this.type,
    }


    
    if(this.type_id == undefined ){
      this.add_type(params);
    }else {
      this.update_type_backend(this.type_id,params);
    }

    




  }

  update_type_backend(type_id : any,params:any){


    this.apiService.update_type(type_id,params).subscribe((data : any) =>{
      if(data.response){
        var style = 'custom-style-success';
        this.alert_(data.message,style);
        this.button_dis = false;
        this.spinner = true;
        this.type = ' ';
        this.getTypes();
      }else {
        var style = 'custom-style-danger';
          this.alert_(data.message,style);
        this.button_dis = false;
        this.spinner = true;
      }

      this.text_label_input = 'Add';
      this.cancel_update_btn = true;
      this.type = '';
      this.type_id = undefined;
    })


  }


  add_type(params:any){
    if(this.type == ' '){
      alert('Please Fill Up')
      this.button_dis = false;
      this.spinner = true;
    }else if(this.type != ' ') {
      
      this.apiService.addType(params).subscribe((data : any) =>{
        if(data.response){
          var style = 'custom-style-success';
          this.alert_(data.message,style);
          this.button_dis = false;
          this.spinner = true;
          this.type = ' ';
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
