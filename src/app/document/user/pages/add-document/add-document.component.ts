import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  number: number;
  document: number;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, name: 'Hydrogen', document: 1.0079},

];
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {


  displayedColumns: string[] = ['number', 'name', 'document'];
  // dataSource = ELEMENT_DATA;


  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  showLoading : boolean = false;

  types : any;
  addForm!: FormGroup;
  submitted = false;
  title = 'Add Documents';
  button_dis : boolean = false;
  spinner : boolean = true;
  user : any;
  m : any;
  y : any;
  d : any;
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
    this.getAlldocuments();
    this.addForm = this.formBuilder.group({
      document_name: ['', Validators.required],
      document_type: ['', Validators.required],
      description: ['', ],
      tracking_number : ['', Validators.required],
      type : ['', Validators.required]
    });

    this.get_last();
   }

   get_last(){




    this.apiService.getLast().subscribe((item:any) => {

    this.addForm.setValue({

      document_name: '',
      tracking_number  : item.number,
      document_type: '',
      description: '',
      type : ''

    });

  
 },  (error) => {                              //Error callback
        
      var message = "Can't fetch tracking number please click reload icon ";
  
      alert(message)

      //throw error;   //You can also throw the error to a global error handler
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
    var style ;

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
      description : this.addForm.value['description'],
      tracking_number : this.addForm.value['tracking_number']
      // tracking_number : this.addForm.value['year'] + this.addForm.value['month'] +  this.addForm.value['day'] +this.addForm.value['tracking_number']
    }


    this.apiService.addDocument(params).subscribe((data : any) =>{
      if(data.response){
        this.alert_(data.message,style = 'custom-style-success');
        this.button_dis = false;
        this.spinner = true;
        this.addForm.reset();
        this.get_last();
        this.getAlldocuments();
      }else {
        
        this.alert_(data.message, style = 'custom-style-danger')
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




  doFilter = (value: any) => {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
  }

  reload(){
    this.showLoading = false;
    this.getAlldocuments();
    this.get_last();
  }



  getAlldocuments(){

    
    this.apiService.getAllDocuments().subscribe((items: any[]) => {

      this.dataSource.data = items;
      this.showLoading = true;

    
  
    });

  }
}
