import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
    this.apiService.verifyUser(this.addForm.value).subscribe((data : any) =>{
      if(data.response){

        Swal.close()
        localStorage.setItem('id', data.data);
        this.router.navigate(['/document/user/dashboard']);
      
      }else {

        Swal.fire(
          data.message,
          '',
          'error'
        )
      
      }
    })
  
}

}
