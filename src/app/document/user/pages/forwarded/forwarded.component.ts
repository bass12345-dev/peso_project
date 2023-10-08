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
  selector: 'app-forwarded',
  templateUrl: './forwarded.component.html',
  styleUrls: ['./forwarded.component.css']
})
export class ForwardedComponent {

  title = 'Forwarded';
  displayedColumns: string[] = ['tracking_number','to', 'document_name', 'document_type', 'remarks', 'created'];
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
      this.getForwardedDocs(); 
      this.getUsers(); 
      this.id = localStorage.getItem("id");
      
      this.addForm = this.formBuilder.group({
        forward: ['', Validators.required],
        remarks: [''],
        tracking_number : [''],
        id : [''],

       
      });
    
    }

    get f() { return this.addForm.controls; }

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

      this.apiService.ForwardDocs(this.addForm.value).subscribe((data : any) =>{
        if(data.response){
          this.alert_(data.message);
          this.button_dis = false;
          this.spinner = true;
          this.addForm.reset();
          this.getForwardedDocs(); 
        }else {
          this.alert_(data.message)
          this.button_dis = false;
          this.spinner = true;
        }
      })

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
    
    getForwardedDocs(){


      this.apiService.getForwardedDocs(localStorage.getItem("id")).subscribe((items: any[]) => {

        this.dataSource.data = items;
        this.showLoading = true;

        console.log(items)
    
      });

    }


    getUsers(){


      this.apiService.getUsers('active').subscribe((items: any[]) => {
        this.users = items;
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
  Swal.close();
}


a(t_number : any){
  this.addForm.setValue({
    tracking_number: t_number,
    forward: '',
    remarks: '',
    id: this.id,
  })
}


}
