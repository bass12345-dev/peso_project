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
      })

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
