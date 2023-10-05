import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataSource } from 'src/app/source/data-source';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  barangay : any;
  addForm!: FormGroup;
  submitted = false;
  title = 'Add Person';
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
      
      
    });
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.button_dis = true;
    this.spinner = false;
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
        this.button_dis = false;
        this.spinner = true;
        return;
        
    }
    this.apiService.addData(this.addForm.value).subscribe((data : any) =>{
      if(data.response){
        this.alert_(data.message);
        this.button_dis = false;
        this.spinner = true;
        this.addForm.reset();
      }else {
        this.alert_(data.message)
        this.button_dis = false;
        this.spinner = true;
      }
    })
  
}

alert_(message:any){

  this._snackBar.open(message, '', {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 5 * 700,
   
  });
}

}
