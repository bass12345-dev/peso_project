import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { DataSource } from 'src/app/source/data-source';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


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
      });
    });
  
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
        this.alert_(data.message)
        this.get_person_data();
        this.button_dis = false;
        this.spinner = true;
      }else {
        this.alert_(data.message)
        this.button_dis = false;
        this.spinner = true;
      }
    });

  }

  alert_(message:any){

    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 700,
     
    });
  }

}
