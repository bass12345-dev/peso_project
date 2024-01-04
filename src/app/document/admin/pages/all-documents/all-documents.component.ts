import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import {SelectionModel} from '@angular/cdk/collections';
import * as $ from 'jquery';
import {MatRippleModule} from '@angular/material/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';



@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent {

  title = 'My Documents';
  displayedColumns: string[] = ['select','tracking_number', 'document_name', 'document_type', 'created','created_by','status','action'];
  public dataSource = new MatTableDataSource<any>();
  showLoading : boolean = false;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  range!: FormGroup;

  selection = new SelectionModel<any>(true, []);

  constructor(
    private apiService :ApiService, 
    public router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  
    ){}
    ngOnInit() {
      this.getMydocuments();

      this.range = this.formBuilder.group({
        start: ['', Validators.required],
        end: ['', Validators.required],
      })
    
    }

  filter_date(){


    

    this.apiService.filter_document_by_date(this.range.value).subscribe((items: any) => {

      this.dataSource.data = items;
      this.showLoading = true;

  
    });

  }

  refresh(){
    this.showLoading = false;
    this.getMydocuments();
  }

  clear_date_filter(){
    this.range.reset();
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


  
    


    doFilter = (value: any) => {
      this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
    }
    ngAfterViewInit(): void {
 
      this.dataSource.paginator = this.paginator;
    }
    
    getMydocuments(){

      
      this.apiService.getAllDocuments().subscribe((items: any[]) => {

        this.dataSource.data = items;
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
      let prefix = "All Documents";
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

    // reset(){

    //   $('input[name="input-filter"]').val('');
    //   this.getMydocuments();
    // }
    


    track(tracking_number : any){

      this.router.navigate(['document/admin/track/' + tracking_number]);

    }

    remove(id :any, document_name : any){


      Swal.fire({
        title: 'Are you sure?',
        text: "Delete this Document " + '"' +   document_name + '"',
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
            id : id
          }
          this.delete(params);
  
        }
      });

     

    }


    multi_delete(){

       var selectedValues= new Array();
       $('input[name=multi_doc]:checked').map(function() {
        selectedValues.push($(this).val());
        
      });
      

      if (selectedValues.length < 1) {
        alert('please Select at least one');
      }else {


        Swal.fire({
          title: 'Are you sure?',
          text: "Delete this Documents" ,
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
              id : selectedValues
            }
          
            this.delete(params);
           
    
          }
        });

      
       
      }
    }

    delete(params : any){
      var style;

      this.apiService.deleteMyDocs(params).subscribe((data : any) =>{
        if(data.response){
          Swal.close();
          this.alert_(data.message,style='custom-style-success');
          this.getMydocuments();
          this.showLoading = true;
        }else {
          this.alert_(data.message,style='custom-style-danger');
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




    

}
