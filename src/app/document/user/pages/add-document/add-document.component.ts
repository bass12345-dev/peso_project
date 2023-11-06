import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {

  types : any;
  addForm!: FormGroup;
  submitted = false;
  title = 'Add Documents';
  button_dis : boolean = false;
  spinner : boolean = true;
  user : any
  constructor(
    private location: Location, 
    private route: ActivatedRoute,
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    
  ) {}

  ngOnInit() {
    this.getTypes();
    this.getUserData();
    this.addForm = this.formBuilder.group({
      document_name: ['', Validators.required],
      document_type: ['', Validators.required],
      description: ['', ],
    });
   }

   getUserData(){
    this.apiService.getUserData(localStorage.getItem("id")).subscribe((item: any) => {
      this.user = item;
      
  });
   }

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

    let params = {
      user_id : localStorage.getItem("id"),
      office_id :  this.user.office_id,
      document_name: this.addForm.value['document_name'],
      document_type : this.addForm.value['document_type'],
      description : this.addForm.value['description']
    }

    this.apiService.addDocument(params).subscribe((data : any) =>{
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

get f() { return this.addForm.controls; }

alert_(message:any){

  this._snackBar.open(message, '', {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 5 * 700,
   
  });
}

  getTypes(){
    this.apiService.getTypes().subscribe((items: any[]) => {
      this.types = items
      });
  }

  back(){
    this.location.back(); 
  }
}
