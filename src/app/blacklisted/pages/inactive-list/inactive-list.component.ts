import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inactive-list',
  templateUrl: './inactive-list.component.html',
  styleUrls: ['./inactive-list.component.css']
})
export class InactiveListComponent implements OnInit {

  displayedColumns: string[] = ['select','name', 'address', 'email', 'phone_number','action'];
  public dataSource = new MatTableDataSource<any>();
  type: string = 'inactive';
  showLoading : boolean = false;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  title = 'Inactive';

  selection = new SelectionModel<any>(true, []);
  constructor(private apiService : ApiService, public router: Router,private _snackBar: MatSnackBar){

  }

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
    let prefix = "Inactive";
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



  multi_set_active(){

    var selectedValues= new Array();
    $('input[name=multi_item]:checked').map(function() {
    selectedValues.push($(this).val());
    
    });

    if (selectedValues.length < 1) {
      alert('please Select at least one');
    }else {
      let params = {
        id : selectedValues,
        status : 'active'
      }

      this.set_active(params);

    }

  }



  set_active(params:any){

   
    var style;

    Swal.fire({
      title: 'Are you sure?',
      text: "",
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
        
        this.apiService.set_active(params).subscribe((data : any) =>{
          if(data.response){
            Swal.close();
            this.alert_(data.message,style='custom-style-success');
            this.getData();
            this.showLoading = true;
          }else {
            this.alert_(data.message,style='custom-style-success');
            this.showLoading = true;
          }
        },  (error) => {                              //Error callback
    
          var message = "Connection Error, Please Try Again";
      
          alert(message)
    
          //throw error;   //You can also throw the error to a global error handler
        });

      }
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
      let params = {
        id : selectedValues,
      }

      this.delete(params);

    }

  }


  delete(params : any){
    var style;
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
        
        this.apiService.delete(params).subscribe((data : any) =>{

          if(data.response){
            Swal.close();
            this.alert_(data.message,style='custom-style-success');
            this.getData();
            this.showLoading = true;
          }else {
            this.alert_(data.message,style='custom-style-success');
            this.showLoading = true;
          }
    
        },  (error) => {                              //Error callback
    
          var message = "Connection Error, Please Try Again";
      
          alert(message)
    
          //throw error;   //You can also throw the error to a global error handler
        });

      }
    })


  }

  view(id : any){
    this.router.navigate(['/blacklisted/view/' + id]);
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
