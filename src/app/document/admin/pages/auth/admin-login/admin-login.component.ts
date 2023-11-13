import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  addForm!: FormGroup;
  submitted = false;
  button_dis : boolean = false;
  spinner : boolean = true;
  

  constructor(
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ){
  }

  ngOnInit(){
 
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() { return this.addForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
    
        return;
        
    }

    Swal.fire({
      title: 'Verifying...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    var loading = true;
    var errorMessage = "";

      this.apiService.verifyAdmin(this.addForm.value).subscribe((data : any) =>{
        

        if(data.response){
  
          Swal.close()
          localStorage.setItem('idd', data.data);
          this.router.navigate(['/document/admin/dashboard']);
        
        }else {
  
          Swal.fire(
            data.message,
            '',
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



}
