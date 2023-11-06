import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  title = 'Manage Users';
  barangay : any;
  addForm!: FormGroup;
  submitted = false;
  button_dis : boolean = false;
  spinner : boolean = true;
  showLoading : boolean = false;
  displayedColumns: string[] = ['name', 'address', 'email', 'phone_number','action'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  constructor(
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ){
  }
  
  ngOnInit() {this.getData();}

  doFilter = (value: any) => {
   this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
 }
 
 
  getData(){
   this.apiService.getUsers('active').subscribe((items: any[]) => {

     this.dataSource.data = items;
     this.showLoading = true;
   });
 
 }

 remove(id:any){

  let items = {
      status : 'inactive'
  }

  Swal.fire({
    title: 'Are you sure?',
    text: "Delete this person",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.showLoading = false;
      Swal.fire({
        title: 'Deleting...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      this.apiService.delete_user(id,items).subscribe((data : any) =>{
        if(data.response){
          Swal.close();
          this.alert_(data.message);
          this.getData();
          this.showLoading = true;
        }else {
          Swal.close();
          this.alert_(data.message);
          this.showLoading = true;
        }
      });

    }
  });

 }

 ngAfterViewInit(): void {
 
  this.dataSource.paginator = this.paginator;
}

export(){

  let timeSpan = new Date().toISOString();
  let prefix = "Users list";
  let fileName = `${prefix}-${timeSpan}`;
  let targetTableElm = document.getElementById('excel-table');
  let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}



alert_(message:any){

  this._snackBar.open(message, '', {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 5 * 700,
   
  });
}



}
