import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataSource } from 'src/app/source/data-source';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  barangay : any;
  type : any;
  addForm!: FormGroup;
  submitted = false;
  title = 'Add Person';
  button_dis : boolean = false;
  spinner : boolean = true;
  showLoading : boolean = false;
  public dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['select', 'program', 'program_description', 'created'];
  selection = new SelectionModel<any>(true, []);
  selected_programs : any;
  selected_ids : any;

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
    this.type = d.type;
    this.get_programs();

    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      emailAddress: ['', [Validators.email]],
      middleName : [''],
      extension : [''],
      phoneNumber : [''],
      age : ['',],
      
      
    });
  }

       /** Whether the number of selected elements matches the total number of rows. */
       isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }
    
      /** Selects all rows if they are not all selected; otherwise clear selection. */
      toggleAllRows() {
        if (this.isAllSelected()) {
          this.selection.clear();
          return;
        }
    
        this.selection.select(...this.dataSource.data);
      }
    
    
       /** The label for the checkbox on the passed row */
       checkboxLabel(row?: any): string {
    
        
       
        if (!row) {
          return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    
       
      }

  get f() { return this.addForm.controls; }


  validateNumber(event : any) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
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
    this.apiService.addData(this.addForm.value).subscribe((data : any) =>{
      if(data.response){
        var style = 'custom-style-success';
        this.alert_(data.message,style)
        this.button_dis = false;
        this.spinner = true;
        this.addForm.reset();
        this.go_to_profile(data.id);
      
      }else {
        var style = 'custom-style-danger';
        this.alert_(data.message,style)
        this.button_dis = false;
        this.spinner = true;
      }
    },  (error) => {                              //Error callback
        
      var message = "Connection Error, Please Try Again";
      this.button_dis = false;
     
      this.spinner = true;
      alert(message)

      //throw error;   //You can also throw the error to a global error handler
    })
  
}

go_to_profile(id:any){
  Swal.fire({
    title: 'Are you sure?',
    text: "Go to Profile",
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.showLoading = false;
      this.router.navigate(['/blacklisted/view/' + id]);
    }
  });
}



get_programs(){

  this.apiService.getPrograms().subscribe((items: any[]) => {
    this.dataSource.data = items;
    this.showLoading = true;
  })
  
}

multi_select(){
  const selected_program = new Array();
  const selected_ids =  new Array();
       $('input[name=multi_doc]:checked').map(function() {
        selected_program.push($(this).data('id'));
        // selected_ids.push($(this).getAttribute('data-message-id'));

      });
  document.getElementById("close-off")?.click();
  this.selected_programs = selected_program;
  this.selected_ids = selected_ids;

  console.log(this.selected_programs)
  
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
