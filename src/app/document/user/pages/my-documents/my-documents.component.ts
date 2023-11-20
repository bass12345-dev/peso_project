import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent {

  title = 'My Documents';
  displayedColumns: string[] = ['tracking_number', 'document_name', 'document_type', 'created','action'];
  public dataSource = new MatTableDataSource<any>();
  showLoading : boolean = false;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    private apiService :ApiService, 
    public router: Router,
  
    ){}
    ngOnInit() {this.getMydocuments();}


    doFilter = (value: any) => {
      this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
    }
    ngAfterViewInit(): void {
 
      this.dataSource.paginator = this.paginator;
    }
    
    getMydocuments(){


      this.apiService.getMyDocuments(localStorage.getItem("id")).subscribe((items: any[]) => {

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
      let prefix = "My Documents Created";
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

remove(id:any, title : any){

  

  Swal.fire({
    title: '',
    text: "Delete Document " + title + ' ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {

      this.apiService.deleteMyDocs(id).subscribe((data : any) =>{
        if(data.response){
          Swal.fire(
            data.message,
            '',
            'success'
          )
          this.getMydocuments();
        }else {
          alert(data.message)
        }
      },  (error) => {                              //Error callback
        
        var message = "Connection Error, Please Try Again";
    
        alert(message)
  
        //throw error;   //You can also throw the error to a global error handler
      });

    }
  })
}


track(tracking_number : any){
  this.router.navigate(['document/user/track/' + tracking_number]);
}

update(tracking_number:any){

  this.router.navigate(['document/user/update-document/' + tracking_number]);
}

}
