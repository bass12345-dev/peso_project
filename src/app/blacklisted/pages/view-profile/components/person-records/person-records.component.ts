import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person-records',
  templateUrl: './person-records.component.html',
  styleUrls: ['./person-records.component.css']
})
export class PersonRecordsComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Input() id:any | undefined;
  displayedColumns: string[] = ['record', 'created','action'];
  dataSource : string[] = [];
  record : string = '';
  showLoading : boolean = false;
  button_dis : boolean = false;
  spinner : boolean = true;
  text_label : string = 'Add';
  cancel_update : boolean = true;
  record_id : any;

  constructor(private route: ActivatedRoute,private apiService : ApiService, public router: Router,private _snackBar: MatSnackBar) {}
  ngOnInit(){this.get_records();
    
  }
  get_records(){

    this.apiService.getRecords(this.id).subscribe((items: any[]) => {
      this.dataSource = items;
      this.showLoading = true;
    });
    
  }

  update_record(id:any,record:any){

    this.text_label = 'Update';
    this.cancel_update = false;
    this.record = record;
    this.record_id = id;

  }

  cancel_update_click(){

    this.text_label = 'Add';
    this.cancel_update = true;
    this.record = '';
    this.record_id = undefined;
   
  }

  delete_record(id:any){
    

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
        this.apiService.delete_record(id).subscribe((data : any) =>{
          if(data.response){
            this.alert_(data.message);
            this.get_records();
            Swal.close();
            this.showLoading = true;
          }else {
            alert(data.message)
          }
        });

      }
    });
  }

  submit(){
    this.showLoading = false;
    this.button_dis = true;
    this.spinner = false;
    let params = {
        record_description: this.record,
    }



    if(this.record_id == undefined ){



      this.add_record(this.id,params);


    }else {
      this.update_record_backend(this.id,this.record_id,params);
    }
      
    }

    update_record_backend(id:any,record_id:any,params : any){

      this.apiService.update_record(record_id,params).subscribe((data : any) =>{
        
        if(data.response){
         this.alert_(data.message);
          this.record = '';
          this.get_records();
          this.showLoading = true;
          this.button_dis = false;
          this.spinner = true;
        
         
        }else {
          alert(data.message)
          this.showLoading = true;
          this.button_dis = false;
          this.spinner = true;
        
        }

        
    this.text_label = 'Add';
    this.cancel_update = true;
    this.record = '';
    this.record_id = undefined;
      });

    }

    add_record(id:any,params:any){

    


      this.apiService.add_record(id,params).subscribe((data : any) =>{
        
        if(data.response){
         this.alert_(data.message);
          this.record = '';
          this.get_records();
          this.showLoading = true;
          this.button_dis = false;
          this.spinner = true;
        }else {
          alert(data.message)
          this.showLoading = true;
          this.button_dis = false;
          this.spinner = true;
        }
      });

    }
  
  alert_(message:any){

    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 700,
    });
  }

}
