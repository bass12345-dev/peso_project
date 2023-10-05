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


}
