import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { param } from 'jquery';
import { empty } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-app-links',
  templateUrl: './app-links.component.html',
  styleUrls: ['./app-links.component.css']
})
export class AppLinksComponent {

  local_id : any;

  constructor(
    private apiService : ApiService,
    private toastr: ToastrService,
    public router: Router,
    private _snackBar: MatSnackBar
    ){}

    open(){
      open('microsoft-edge:http://cpesd-infosys.wuaze.com');
   }
  open_(){

    let id = localStorage.getItem('permissions')



    if(id == null) {
          Swal.fire({
      title: 'Enter Security Code',
      html:
      '<input type="password" id="swal-input2" class="swal2-input" #abc>',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',

    }).then((result) => {
      if (result.isConfirmed) {
        let params = {'code' :  (<HTMLInputElement>document.getElementById('swal-input2')).value};

        Swal.fire({
          title: 'Verifying...',
          html: 'Please wait...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        });

        this.apiService.VerifyCode(params).subscribe((data : any) =>{
          if(data.response){
            Swal.close();


            localStorage.setItem('permissions', btoa(data.message));
            this.router.navigate(['/blacklisted/dashboard']);
          }else {
            
            Swal.fire(
              '',
              data.message,
              'error'
            )
           
          }
        },
        (error) => {                              //Error callback
          Swal.close();
          var message = "Connection Error, Please Try Again";
      
          alert(message)
    
          //throw error;   //You can also throw the error to a global error handler
        }
        )

      }
      
    })
    }else {

      Swal.fire({
        title: 'Redirecting...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      this.local_id = localStorage.getItem('permissions')

      this.apiService.verify_blacklisted_user(atob(this.local_id)).subscribe((data:any)=> {

        if(data.response) {
          Swal.close();
          this.router.navigate(['/blacklisted/dashboard']);
        }else {
           
          
           Swal.close();
           let message = "You don't have permission";
           this.alert_(message);
        }

    })

      // this.router.navigate(['/blacklisted/dashboard']);

     

  //  setTimeout(() => {
  //   this.router.navigate(['/blacklisted/dashboard']);
  //   Swal.close();
  //         }, 4000);
      
    }


  }



  open_document(){

    Swal.fire({
      title: 'Login As',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `User`,
      denyButtonText: `Admin`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['../document/login']);

      } else if (result.isDenied) {
        this.router.navigate(['../document/admin/login']);
       
      }
    })
  }

  open_user(){
    alert('asd');
  }


  alert_(message:any){

    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['custom-style-danger']
    });
  }
}
