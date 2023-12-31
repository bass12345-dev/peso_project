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
      this.id = localStorage.getItem("id");
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
      let prefix = "Forwarded Documents";
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





}
