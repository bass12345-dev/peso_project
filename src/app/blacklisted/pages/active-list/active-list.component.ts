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
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              private _snackBar: MatSnackBar
            
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
  this.apiService.getList(this.type).subscribe((items: any) => {

    const data = atob(items);

    this.dataSource.data = JSON.parse(data) ;
    this.showLoading = true;

  });

}

export(){
  Swal.fire({
    title: 'Exporting...',
    html: 'Please wait...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    
  });

  let timeSpan = new Date().toISOString();
  let prefix = "Active";
  let fileName = `${prefix}-${timeSpan}`;
  let targetTableElm = document.getElementById('excel-table');
  let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });

  try {


    XLSX.writeFile(wb, `${fileName}.xlsx`);
    
   Swal.close()
    
  } catch (error) {

    alert('Something Wrong in exporting')
    
  }
  
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


      let params = {
        id : id,
        status : item
      }
      this.delete(params);

    }
  },  (error) => {                              //Error callback
        
    var message = "Connection Error, Please Try Again";

    alert(message)

    //throw error;   //You can also throw the error to a global error handler
  })

  
}


multi_delete(){


  var selectedValues= new Array();
  $('input[name=multi_item]:checked').map(function() {
   selectedValues.push($(this).val());
   
 });

    if (selectedValues.length < 1) {
      alert('please Select at least one');
    }else {

      Swal.fire({
        title: 'Are you sure?',
        text: "Remove all selected ? " ,
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
          

          let params = {
            id : selectedValues,
            status : 'inactive'
          }
        
          this.delete(params);
         
  
        }
      });
    }

}



delete(params : any){

      var style;
  
      this.apiService.remove(params).subscribe((data : any) =>{
        if(data.response){
          Swal.close();
          this.alert_(data.message,style='custom-style-success');
          this.getData();
          this.showLoading = true;
        }else {
          this.alert_(data.message,style='custom-style-danger');
          this.showLoading = true;
        }
      },  (error) => {                              //Error callback
    
        var message = "Connection Error, Please Try Again";
    
        alert(message)
  
        //throw error;   //You can also throw the error to a global error handler
      });


}



alert_(message:any, style : any){

  this._snackBar.open(message, '', {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 5 * 700,
    panelClass: [style]
   
  });
}

view_records(id:any){

  this.router.navigate(['/blacklisted/view/' + id]);

}

}
