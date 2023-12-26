import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as $ from 'jquery';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {


  title = 'Incoming';
  displayedColumns: string[] = ['tracking_number','to', 'document_name', 'document_type','remarks', 'release_date','action'];
  public dataSource = new MatTableDataSource<any>();
  showLoading : boolean = false;
  users : any;
  id : any;
  to :any;
  addForm!: FormGroup;
  button_dis : boolean = false;
  spinner : boolean = true;
  submitted = false;
  t_number : any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    private apiService :ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private location: Location, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  
    ){}
    ngOnInit() {
      this.getIncomingDocs(); 
      this.id = localStorage.getItem("id");
      

    
    }





    alert_(message:any){

      this._snackBar.open(message, '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5 * 700,
       
      });
    }


    doFilter = (value: any) => {
      this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
    }
    ngAfterViewInit(): void {
 
      this.dataSource.paginator = this.paginator;
    }
    
    getIncomingDocs(){


      this.apiService.getIncomingDocs(localStorage.getItem("id")).subscribe((items: any[]) => {

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
      let prefix = "Incoming Documents";
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

receiveDoc(id:any, title : any){

  let params = {

    id : id
  }

  Swal.fire({
    title: '',
    text: "Receive Document " + title + ' ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {

      this.apiService.ReceivedDoc(params).subscribe((data : any) =>{
        if(data.response){
          Swal.fire(
            data.message,
            '',
            'success'
          )
          this.getIncomingDocs();
        }else {
          alert(data.message)
        }
      },  (error) => {                              //Error callback
        
        var message = "Connection Error, Please Try Again";
    
        alert(message)
  
        //throw error;   //You can also throw the error to a global error handler
      })

    }
  })
}

track(tracking_number : any){
  this.router.navigate(['document/user/track/' + tracking_number]);
}

}
