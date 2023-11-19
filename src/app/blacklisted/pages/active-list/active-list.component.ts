import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-active-list',
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.css']
})
export class ActiveListComponent  {
  
  displayedColumns: string[] = ['select','name', 'address', 'email', 'phone_number','action'];
  public dataSource = new MatTableDataSource<any>();
  type: string = 'active';
  showLoading : boolean = false;
  title = 'Active';
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  selection = new SelectionModel<any>(true, []);

  constructor(
              private apiService :ApiService, 
              public router: Router,
            
              ){}


ngOnInit() {this.getData();}



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
  

 doFilter = (value: any) => {
  this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
}


 getData(){
  this.apiService.getList(this.type).subscribe((items: any[]) => {

    this.dataSource.data = items;
    this.showLoading = true;

  });

}

export(){
  Swal.fire({
    title: 'Verifying...',
    html: 'Please wait...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    
  });
  let timeSpan = new Date().toISOString();
  let prefix = "Active";
  let fileName = `${prefix}-${timeSpan}`;
  let targetTableElm = document.getElementById('excel-table');
  let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
  XLSX.writeFile(wb, `${fileName}.xlsx`);

}
ngAfterViewInit(): void {
 
  this.dataSource.paginator = this.paginator;
}

remove(id:any){

  let item = 'inactive';

  Swal.fire({
    title: '',
    text: "Remove this person in the list",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {

      this.apiService.remove(id,item).subscribe((data : any) =>{
        if(data.response){
          Swal.fire(
            data.message,
            '',
            'success'
          )
          this.getData();
        }else {
          alert(data.message)
        }
      });

    }
  },  (error) => {                              //Error callback
        
    var message = "Connection Error, Please Try Again";

    alert(message)

    //throw error;   //You can also throw the error to a global error handler
  })

  
}


view_records(id:any){

  this.router.navigate(['/blacklisted/view/' + id]);

}

}
