import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {}

  ngOnInit() {
    let d = new DataSource;
    this.barangay = d.barangay;
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

   get f() { return this.addForm.controls; }

   getUserData(){
    this.apiService.getUserData(localStorage.getItem("id")).subscribe((item: any) => {
      this.user = item;
      
  });
   }

}
