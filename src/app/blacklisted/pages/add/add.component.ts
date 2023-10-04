import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataSource } from 'src/app/source/data-source';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  barangay : any;
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder
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
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
        return;
    }

    this.apiService.addData(this.addForm.value).subscribe((data : any) =>{
      if(data.response){
        alert(data.message)
        this.addForm.reset();
      }else {
        alert(data.message)
      }
    })
  
}

}
