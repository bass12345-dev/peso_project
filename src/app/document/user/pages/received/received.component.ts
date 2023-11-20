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
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent {

  title = 'Received';
  displayedColumns: string[] = ['tracking_number', 'document_name', 'document_type', 'remarks','created','action'];
  public dataSource = new MatTableDataSource<any>();
  showLoading : boolean = false;
  users : any;
  actions : any;
  id : any;
  to :any;
  addForm!: FormGroup;
  addForm1!: FormGroup;
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
      this.getReceivedDocs(); 
      this.getUsers(); 
      this.getActions(); 
      this.id = localStorage.getItem("id");
      this.id = atob(this.id);
      
      this.addForm = this.formBuilder.group({
        forward: ['', Validators.required],
        remarks: [''],
        tracking_number : [''],
        id : [''],
        history_id : [''],

       
      });

      this.addForm1 = this.formBuilder.group({
        history_id1: ['', Validators.required],
        final: ['', Validators.required],
        remarks1: [''],
      
      });
    
    }

    get f() { return this.addForm.controls; }
    get f1() { return this.addForm1.controls; }
    onSubmit1() {
      this.button_dis = true;
      this.spinner = false;
      this.submitted = true;

      if (this.addForm1.invalid) {
        this.button_dis = false;
        this.spinner = true;
        return;
        
    }
    let params = {

      id : this.addForm1.value['history_id1'],
      final_action_taken : this.addForm1.value['final'],
      remarks1 : this.addForm1.value['remarks1'],
    }


    this.apiService.CompletedDoc(params).subscribe((data : any) =>{
      if(data.response){
        Swal.fire(
          data.message,
          '',
          'success'
        )

        this.button_dis = false;
        this.spinner = true;
        this.addForm1.reset();
        this.getReceivedDocs(); 
        document.getElementById("close-off1")?.click();
      
      }else {
        this.button_dis = false;
        this.spinner = true;
        alert(data.message);

      }
    },  (error) => {                              //Error callback
        
      var message = "Connection Error, Please Try Again";
  
      alert(message)

      //throw error;   //You can also throw the error to a global error handler
    })
    }


    onSubmit() {
      this.button_dis = true;
      this.spinner = false;
      this.submitted = true;
      var style;
  
      // stop here if form is invalid
      if (this.addForm.invalid) {
          this.button_dis = false;
          this.spinner = true;
          return;
          
      }

      

      this.apiService.ForwardDocs(this.addForm.value).subscribe((data : any) =>{
        if(data.response){
          this.alert_(data.message,style = 'custom-style-success');
          this.button_dis = false;
          this.spinner = true;
          this.addForm.reset();
          this.getReceivedDocs(); 
          document.getElementById("close-off")?.click();
        }else {
          this.alert_(data.message,style = 'custom-style-danger');
          this.button_dis = false;
          this.spinner = true;
        }
      },  (error) => {                              //Error callback
        
        var message = "Connection Error, Please Try Again";
    
        alert(message)
  
        //throw error;   //You can also throw the error to a global error handler
      })

    }

    alert_(message:any,style : any){

      this._snackBar.open(message, '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5 * 700,
        panelClass: [style]
       
      });
    }


    doFilter = (value: any) => {
      this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
    }
    ngAfterViewInit(): void {
 
      this.dataSource.paginator = this.paginator;
    }
    
    getReceivedDocs(){


      this.apiService.getReceivedDocs(localStorage.getItem("id")).subscribe((items: any[]) => {

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

    getActions(){


      this.apiService.getActions().subscribe((items: any[]) => {
        this.actions = items;
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
      let prefix = "Received Documents";
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


a(t_number : any, history_id : any){
  this.addForm.setValue({
    tracking_number: t_number,
    forward: '',
    remarks: '',
    id: this.id,
    history_id: history_id,
  })
}


complete_off_canvas(id: any , title : any){

  this.addForm1.setValue({

    history_id1: id,
    final : '',
    remarks1: '',
    
  });


}

completed(id: any , title : any){



    // let params = {
  
    //   id : id
    // }
  
    // Swal.fire({
    //   title: '',
    //   text: "Approve Document " + title + ' ?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
  
        // this.apiService.CompletedDoc(params).subscribe((data : any) =>{
        //   if(data.response){
        //     Swal.fire(
        //       data.message,
        //       '',
        //       'success'
        //     )
        //     this.getReceivedDocs();
        //   }else {
        //     alert(data.message)
        //   }
        // });
  
    //   }
    // })
  }





}
