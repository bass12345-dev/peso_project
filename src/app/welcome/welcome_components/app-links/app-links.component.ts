import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { param } from 'jquery';

@Component({
  selector: 'app-app-links',
  templateUrl: './app-links.component.html',
  styleUrls: ['./app-links.component.css']
})
export class AppLinksComponent {


  constructor(
    private apiService : ApiService,
    private toastr: ToastrService,
    public router: Router
    ){}

    open(){
      open('microsoft-edge:https://github.com');
   }
  open_(){
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


            localStorage.setItem('permissions', data.message);
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
}
