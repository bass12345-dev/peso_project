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
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {

  title = 'Track #' +  this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['number','date_released',  'user1', 'date_received', 'user2', 'duration'];
  public dataSource = new MatTableDataSource<any>();
  showLoading : boolean = false;
  users : any;
  id : any;
  tracking_number : any;
  to :any;
  addForm!: FormGroup;
  button_dis : boolean = false;
  spinner : boolean = true;
  submitted = false;
  t_number : any;
  document : any;
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
     
      this.id = localStorage.getItem("id");
      this.tracking_number = this.route.snapshot.paramMap.get('id');
      this.getHistory();
      this.getDocumentData();

    }

    getHistory(){

      this.apiService.getHistoryDocs(this.tracking_number).subscribe((items: any[]) => {

        this.dataSource.data = items;
        this.showLoading = true;

        // let total_duration = 0;

        // for (let index = 0; index < items.length; index++) {

        //   console.log(items[index].)
          
        // }

        // console.log(items)
    
      });


    }

    getDocumentData(){

      this.apiService.getDocumentData(this.tracking_number).subscribe((items: any[]) => {
        this.document = items;
      })

    }




}
