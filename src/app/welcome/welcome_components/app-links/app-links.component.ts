import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  
  open_(){
    Swal.fire({
      title: 'Enter Security Code',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',

    }).then((result) => {
      if (result.isConfirmed) {
        let params = {'code' : result.value};

        this.apiService.VerifyCode(params).subscribe((data : any) =>{
          if(data.response){
            localStorage.setItem('permissions', '1');
            this.router.navigate(['/blacklisted/dashboard']);
          }else {
            
            Swal.fire(
              '',
              data.message,
              'error'
            )
           
          }
        })

      }
      
    })
  }
}
