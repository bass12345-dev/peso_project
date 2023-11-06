import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inactive-list',
  templateUrl: './inactive-list.component.html',
  styleUrls: ['./inactive-list.component.css']
})
export class InactiveListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'address', 'email', 'phone_number','action'];
  public dataSource = new MatTableDataSource<any>();
  type: string = 'inactive';
  showLoading : boolean = false;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  title = 'Inactive';
  constructor(private apiService : ApiService){

  }

  ngOnInit() {this.getData();}

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
    let timeSpan = new Date().toISOString();
    let prefix = "Inactive";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById('excel-table');
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  ngAfterViewInit(): void {
   
    this.dataSource.paginator = this.paginator;
  }

  delete(id : any){

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
        
        this.apiService.delete(id).subscribe((data : any) =>{

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
    
        })

      }
    })


  }

  set_active(id:any){

    let item = 'active';


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
        
        this.apiService.set_active(id,item).subscribe((data : any) =>{
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
    })
  }

}
