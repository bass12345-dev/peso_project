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

      //Add Data
      addData(data: any){
        return this.http.post(`${this.apiUrl}/api/add`,data);
      }


  //GET

  count_all(){
    return this.http.get<any[]>(`${this.apiUrl}/api/count_all`);
  }

  getList(status : any =""){
      return this.http.get<any[]>(`${this.apiUrl}/api/person?type=` + status);
  } 

  //PUT

    set_active(id:any, item : any){

      return this.http.put(`${this.apiUrl}/api/set-active/` + id,item);
  
    }

    remove(id:any, item : any){
      return this.http.put(`${this.apiUrl}/api/remove/` + id,item);
    }

  //DELETE
    

    delete(id : any){

      return this.http.delete(`${this.apiUrl}/api/delete/` + id);
    }




 }
