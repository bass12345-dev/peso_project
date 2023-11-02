import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent {

  title = 'Manage Offices';
  office : string = ' ';
  button_dis : boolean = false;
  spinner : boolean = true;
  displayedColumns: string[] = ['office', 'created','action'];
  dataSource : string[] = [];
  showLoading : boolean = false;
  text_label_input : string = 'Add';
  cancel_update_btn : boolean = true;
  office_id : any;

  
constructor(
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ){
  }

  ngOnInit(){
    this.getOffices()
  }

  update_office(id : any,office:any){

    this.text_label_input = 'Update';
    this.cancel_update_btn = false;
    this.office = office;
    this.office_id = id;

  }

  cancel_update_click(){

    this.text_label_input = 'Add';
    this.cancel_update_btn = true;
    this.office = '';
    this.office_id = undefined;
   
  }

  getOffices(){
    this.apiService.getOffices().subscribe((items: any[]) => {
      this.dataSource = items;
      this.showLoading = true;
    });
  }

  delete_office(office_id : any){
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
        this.apiService.delete_office(office_id).subscribe((data : any) =>{
          if(data.response){
            Swal.close();
            this.alert_(data.message);
            this.getOffices();
            this.showLoading = true;
          }else {
            alert(data.message)
          }
        });

      }
    });

  }

  submit(){
    this.button_dis = true;
    this.spinner = false;

    let params =  {
      office: this.office,
    }


    if(this.office_id == undefined ){
      this.add_office(params);
    }else {
      this.update_office_backend(this.office_id,params);
    }
    




  }


  update_office_backend(id:any,params:any){
    this.apiService.update_office(id,params).subscribe((data : any) =>{
      if(data.response){
        this.alert_(data.message);
        this.button_dis = false;
        this.spinner = true;
        this.office = ' ';
        this.getOffices();
      }else {
        this.alert_(data.message)
        this.button_dis = false;
        this.spinner = true;
      }

      this.text_label_input = 'Add';
      this.cancel_update_btn = true;
      this.office = '';
      this.office_id = undefined;
    });
  }

  


  add_office(params:any){

    if(this.office == ' '){
      alert('Please Fill Up')
      this.button_dis = false;
      this.spinner = true;
    }else if(this.office != ' ') {
      
      this.apiService.addOffice(params).subscribe((data : any) =>{
        if(data.response){
          this.alert_(data.message);
          this.button_dis = false;
          this.spinner = true;
          this.office = ' ';
          this.getOffices();
        }else {
          this.alert_(data.message)
          this.button_dis = false;
          this.spinner = true;
        }
      });

    }

  }

  alert_(message:any){

    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 700,
     
    });
  }
  

}
