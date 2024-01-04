import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { DataSource } from 'src/app/source/data-source';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  title = 'Update';
  barangay : any;
  addForm!: FormGroup;
  submitted = false;
  person : any;
  id : any;
  button_dis : boolean = false;
  spinner : boolean = true;
  constructor(
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location: Location, 
    ){
  }

  ngOnInit(){
    let d = new DataSource;
    this.barangay = d.barangay;

    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      emailAddress: ['', [Validators.email]],
      middleName : [''],
      extension : [''],
      phoneNumber : [''],
      age : ['']
      
      
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.get_person_data();
  }

  get f() { return this.addForm.controls; }
  onSubmit() {
  }

  get_person_data(){

    this.apiService.getPersonData(this.id).subscribe((item: any) => {
        this.person = item;
        this.addForm.setValue({
        firstName: item.first_name,
        lastName: item.last_name,
        address: item.address,
        emailAddress: item. email_address,
        middleName : item.middle_name,
        extension : item.extension,
        phoneNumber : item.phone_number,
        age : item.age
      });
    });
  
  }

  validateNumber(event : any) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }



  
  update(){

    this.button_dis = true;
    this.spinner = false;
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
        this.button_dis = false;
        this.spinner = true;
        return;
        
    }
    this.apiService.update_person_info(this.id,this.addForm.value).subscribe((data : any) =>{
      if(data.response){
        var style = 'custom-style-success';
        this.alert_(data.message,style)
        this.button_dis = false;
        this.spinner = true;
      }else {
        var style = 'custom-style-danger';
        this.alert_(data.message,style)
        this.button_dis = false;
        this.spinner = true;
      }
    },  (error) => {                              //Error callback 
      var message = "Connection Error, Please Try Again";
      alert(message)
  });

  }

  alert_(message:any, style : any){

    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 700,
      panelClass: [style]
     
    });
  }

  back(){
    this.location.back(); 
  }

}
