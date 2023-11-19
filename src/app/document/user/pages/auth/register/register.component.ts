import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSource } from 'src/app/source/data-source';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  addForm!: FormGroup;
  submitted = false;
  title = 'Register !';
  button_dis : boolean = false;
  spinner : boolean = true;
  offices : any = [];
  barangay : any;
  constructor(
    private location: Location, 
    private route: ActivatedRoute,
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    
  ) {}


  ngOnInit() {
    let d = new DataSource;
    this.barangay = d.barangay;
    this.getOffices()
    this.addForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: ['', ],
      last_name: ['',Validators.required ],
      extension : ['', ],
      email : ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      contact_number : ['',[Validators.required, Validators.pattern("^[0-9]*$")] ],
      address: ['',Validators.required ],
      office: ['',Validators.required ],
      user_name : ['', Validators.required],
      password : ['', Validators.required],
      confirm_password : ['', Validators.required],
    });
   }


   get f() { return this.addForm.controls; }


   onSubmit() {


    this.button_dis = true;
    this.spinner = false;
    this.submitted = true;
    var style;

       // stop here if form is invalid
       if (this.addForm.invalid) {
        this.button_dis = false;
        this.spinner = true;
        return;
      }


     if(this.addForm.value['password'] != this.addForm.value['confirm_password'] ) {

      alert("Password Don't Match");
      this.button_dis = false;
      this.spinner = true;
     }else{

      this.apiService.Register(this.addForm.value).subscribe((data : any) =>{
        if(data.response){
          this.alert_(data.message,style='custom-style-success');
          this.button_dis = false;
          this.spinner = true;
          this.addForm.reset();
        }else {
          this.alert_(data.message,style='custom-style-danger');
          this.button_dis = false;
          this.spinner = true;
        }
      },
      (error) => {                              //Error callback
        
        var message = "Connection Error, Please Try Again";
    
        alert(message)
  
        //throw error;   //You can also throw the error to a global error handler
      }
      )
     }
   }



   alert_(message:any, style : any){

    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 700,
      panelClass: [style]
     
    });
  }


  getOffices(){
    this.apiService.getOffices().subscribe((items: any[]) => {
      this.offices = items;
      
    },
    (error) => {                              //Error callback
        
      var message = "Can't Get Offices";
  
      alert(message)

      //throw error;   //You can also throw the error to a global error handler
    }
    );
  }
  


}
