import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css']
})
export class UpdateDocumentComponent {

  types : any;
  addForm!: FormGroup;
  submitted = false;
  title = 'Update Document';
  button_dis : boolean = false;
  spinner : boolean = true;
  user : any
  document : any;
  tracking_number : any;
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
    this.tracking_number = this.route.snapshot.paramMap.get('id');
    this.getDocumentData();
    this.addForm = this.formBuilder.group({
      document_name: ['', Validators.required],
      document_type: ['', Validators.required],
      description: ['', ],
    });
   }


   getDocumentData(){

    this.apiService.getDocumentData(this.tracking_number).subscribe((item: any) => {
      this.document = item;

      console.log(item)

      this.addForm.setValue({
        document_name: item.document_name,
        document_type: item.type_id,
        description : item.description 

      })
    })

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
    var style;

    // stop here if form is invalid
    if (this.addForm.invalid) {
        this.button_dis = false;
        this.spinner = true;
        return;
        
    }

    let params = {
      t_number : this.tracking_number,
      document_name: this.addForm.value['document_name'],
      document_type : this.addForm.value['document_type'],
      description : this.addForm.value['description']
    }


    this.apiService.update_document(this.tracking_number,params).subscribe((data : any) =>{
      if(data.response){
        this.alert_(data.message,style = 'custom-style-success');
        this.button_dis = false;
        this.spinner = true;
        // this.addForm.reset();
      }else {
        this.alert_(data.message,style = 'custom-style-danger')
        this.button_dis = false;
        this.spinner = true;
      }
    },  (error) => {                              //Error callback
        
      var message = "Connection Error, Please Try Again";
  
      alert(message)

      //throw error;   //You can also throw the error to a global error handler
    })
  
}

get f() { return this.addForm.controls; }

alert_(message:any,style : any){

  this._snackBar.open(message, '', {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 5 * 700,
    panelClass: [style]
   
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
