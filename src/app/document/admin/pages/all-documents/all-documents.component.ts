import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent {

  title = 'My Documents';
  displayedColumns: string[] = ['tracking_number', 'document_name', 'document_type', 'created','created_by','action'];
  public dataSource = new MatTableDataSource<any>();
  showLoading : boolean = false;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    private apiService :ApiService, 
    public router: Router,
    private _snackBar: MatSnackBar
  
    ){}
    ngOnInit() {this.getMydocuments();}


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

        console.log(items)
    
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
      let prefix = "All Documents";
      let fileName = `${prefix}-${timeSpan}`;
      let targetTableElm = document.getElementById('excel-table');
      let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
      XLSX.writeFile(wb, `${fileName}.xlsx`);
      Swal.close();
    }
    


    track(tracking_number : any){

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
          this.apiService.deleteMyDocs(id).subscribe((data : any) =>{
            if(data.response){
              Swal.close();
              this.alert_(data.message);
              this.getMydocuments();
              this.showLoading = true;
            }else {
              alert(data.message)
            }
          });
  
        }
      });

     

    }

    alert_(message:any){

      this._snackBar.open(message, '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5 * 700,
       
      });
    }
    

}
