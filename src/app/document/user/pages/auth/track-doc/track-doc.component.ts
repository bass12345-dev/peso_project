import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-track-doc',
  templateUrl: './track-doc.component.html',
  styleUrls: ['./track-doc.component.css']
})
export class TrackDocComponent {
  items : any;
  track = true;
  constructor(

    private route: ActivatedRoute,
    private apiService : ApiService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    
  ) {}

  search(text:any){

    Swal.fire({
      title: 'Verifying...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });



    this.apiService.track_document(localStorage.getItem("id"),text.target.value).subscribe((data : any) =>{
      Swal.close();
      if(data.response == false){

        alert('Tracking Number Not Found')

      }

      if(data.length) {
        this.track = false;
      }
     this.items = data
     


    })
    

  }
}
