import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/service/api.service';
import { DataSource } from 'src/app/source/data-source';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  user : any
  addForm!: FormGroup;
  submitted = false;
  title = 'Register !';
  button_dis : boolean = false;
  spinner : boolean = true;
  offices : any = [];
  barangay : any;

  constructor(
    private apiService : ApiService, 
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    let d = new DataSource;
    this.barangay = d.barangay;
    this.getOffices()
    this.getUserData();
   
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

   get f() { return this.addForm.controls; }

   getUserData(){
    this.apiService.getUserData(localStorage.getItem("id")).subscribe((item: any) => {
      this.user = item;

      this.addForm.setValue({
        first_name : item.first_name,
        middle_name: item.middle_name,
        last_name: item.last_name,
        extension : item.extension,
        email : item.email_address,
        contact_number :item.contact_number,
        address: item.address,
        office: item.office_id,
        user_name : item.username,
        
     

      })
      
  });
   }






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



      this.apiService.UpdateProfile(localStorage.getItem("id"),this.addForm.value).subscribe((data : any) =>{
        if(data.response){
          this.alert_(data.message,style='custom-style-success');
          this.button_dis = false;
          this.spinner = true;
          this.getUserData();
        }else {
          this.alert_(data.message,style='custom-style-danger');
          this.button_dis = false;
          this.spinner = true;
        }
      })

   }



   alert_(message:any, style : any){

    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 700,
      panelClass: [style]
     
    });
  }

}
