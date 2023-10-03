import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers : any

  constructor(private http: HttpClient) { }

  apiUrl = 'http://127.0.0.1:8000';


  //                  Blacklisted                 //

  //POST

      //Security
       VerifyCode(data:any) {
        this.headers = new HttpHeaders().
        set('content-type', 'application/json').
        set('Access-Control-Allow-Origin', '*').
        set('Authorization', 'Basic ' + btoa(data.code))
        return this.http.post(`${this.apiUrl}/api/verify-code`,data,this.headers)
      }

      //Search
      searchName(data:any){
        return this.http.post(`${this.apiUrl}/api/search-query`,data);
      }


  //GET

  count_all(){
    return this.http.get<any[]>(`${this.apiUrl}/api/count_all`);
  }

  //PUT

  //DELETE




 }
