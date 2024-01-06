import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers : any
  requestOptions : any;

  constructor(private http: HttpClient) { 

    let api_key = "base64:2bKEr//MLbjJv0Y+UdvMlzXK2a/8qwvnteFmxH1RgVs=";
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${api_key}`
      });

    this.requestOptions = { headers: headers };
  }

  // apiUrl = 'http://127.0.0.1:8000';
  apiUrl = 'http://localhost/api/public';
  // apiUrl = 'http://localhost/cpesd-api/public';
  // apiUrl = 'http://192.168.1.25/cpesd-api/public';
  // apiUrl = 'https://basil-project.000webhostapp.com/public';


  //                  Blacklisted                 //

  verify_blacklisted_user(data:any) {
    let item = {

      id : data

    }
    return this.http.post(`${this.apiUrl}/api/verify-b-user`,item,this.requestOptions);
  }


  //POST

      //Security
       VerifyCode(data:any) {
        this.headers = new HttpHeaders().
        set('content-type', 'application/json').
        set('Access-Control-Allow-Origin', '*').
        set('Authorization', 'Basic ' + btoa(data.code))
        return this.http.post(`${this.apiUrl}/api/verify-code`,data,this.requestOptions)
      }

      //Search
      searchName(data:any){
        return this.http.post(`${this.apiUrl}/api/search-query`,data);
      }

      //Add Data
      addData(data: any){
        return this.http.post(`${this.apiUrl}/api/add`,data,this.requestOptions);
      }

      ChangeCode(data: any,id :any){
        return this.http.post(`${this.apiUrl}/api/change-code?id=` + id,data,this.requestOptions);
      }

      remove(params:any){
        return this.http.post(`${this.apiUrl}/api/remove`, params,this.requestOptions);
      }


      set_active(params : any){

        return this.http.post(`${this.apiUrl}/api/set-active`,params,this.requestOptions);
    
      }


      delete(params : any){

        return this.http.post(`${this.apiUrl}/api/delete`,params,this.requestOptions);
      }


  //GET

  DataPerYearWatchlisted(year:any) {
    return this.http.get<any[]>(`${this.apiUrl}/api/data-per-year?year=` + year);
  }

  DataPerBarangayWatchlisted() {
    return this.http.get<any[]>(`${this.apiUrl}/api/data-per-barangay`);
  }

  count_all(){
    return this.http.get<any[]>(`${this.apiUrl}/api/count_all`);
  }

  getList(status : any =""){
      return this.http.get<any[]>(`${this.apiUrl}/api/person?type=` + status);
  } 

    //Get Person Data
  getPersonData(id:any): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/api/person_info?id=` + id);
    }

    //Get Records
    getRecords(id:any): Observable<any[]>{

      return this.http.get<any[]>(`${this.apiUrl}/api/get_records?id=` + id);
  }



  check_person(id:any){
    return this.http.get<any[]>(`${this.apiUrl}/api/check_person?id=` + id);
  }

  //PUT

  add_record(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/add_record/` + id,params,this.requestOptions);
  }


  update_record(record_id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_record/` + record_id,params,this.requestOptions);
  }

  update_program(program_id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_program/` + program_id,params,this.requestOptions);
  }



   

    update_person_info(id:any,params : any){
      return this.http.put(`${this.apiUrl}/api/update-person-info/` + id,params,this.requestOptions);
    }
  
  //DELETE
    




    delete_record(id:any){
      return this.http.delete(`${this.apiUrl}/api/delete-record/` + id,this.requestOptions);
    }

    delete_program(id:any){
      return this.http.delete(`${this.apiUrl}/api/delete-program/` + id,this.requestOptions);
    }



     //                  Document Tracking                //


     //Checking 

     verify_dt_user(data:any) {
      let item = {
  
        id : data
  
      }
      return this.http.post(`${this.apiUrl}/api/verify-dt-user`,item,this.requestOptions);
    }


    verify_dt_admin(data:any) {
      
      let item = {
  
        id : data
  
      }
      return this.http.post(`${this.apiUrl}/api/verify-dt-admin`,item,this.requestOptions);
    }

  //POST



      //Add Data
      addOffice(data: any){
        return this.http.post(`${this.apiUrl}/api/add-office`,data, this.requestOptions);
      }

      addType(data: any){
        return this.http.post(`${this.apiUrl}/api/add-document-type`,data,this.requestOptions);
      }

      addProgram(data: any){
        return this.http.post(`${this.apiUrl}/api/add-program`,data,this.requestOptions);
      }

      verifyUser(body:any){
        return this.http.post(`${this.apiUrl}/api/verify-user`,body,this.requestOptions);
      }

      addDocument(data: any){
        return this.http.post(`${this.apiUrl}/api/add-document`,data,this.requestOptions);
      }

      ForwardDocs(data: any){
        return this.http.post(`${this.apiUrl}/api/forward-document`,data,this.requestOptions);
      }

      ReceivedDoc(data: any){
        return this.http.post(`${this.apiUrl}/api/receive-document`,data,this.requestOptions);
      }

      CompletedDoc(data: any){
        return this.http.post(`${this.apiUrl}/api/complete-document`,data,this.requestOptions);
      }


      save_programs(data:any){
        return this.http.post(`${this.apiUrl}/api/save-person-program`,data,this.requestOptions);
      }
      


      Register(data: any){
        return this.http.post(`${this.apiUrl}/api/register`,data);
      }

      DataPerYearDocument(year:any) {
        return this.http.get<any[]>(`${this.apiUrl}/api/data-per-year-document?year=` + year);
      }

  //GET


  GetTransactionToday(id:any){
    return this.http.get<any>(`${this.apiUrl}/api/get-transaction-today?id=` + id);
}

  getLast(){
    return this.http.get<any>(`${this.apiUrl}/api/get-last`);
} 


    getOffices(){
      return this.http.get<any[]>(`${this.apiUrl}/api/offices`);
  } 

  

  getTypes(){
    return this.http.get<any[]>(`${this.apiUrl}/api/get-document-types`);
  } 

  getPrograms(){
    return this.http.get<any[]>(`${this.apiUrl}/api/get-programs`);
  }

  get_person_programs(id:any){
    return this.http.get<any[]>(`${this.apiUrl}/api/get-person-programs?id=` + id);
  }

  getUsers(type:any): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/api/get-users?type=` + type);;
  }


  getUserData(id:any): Observable<any[]>{

    return this.http.get<any[]>(`${this.apiUrl}/api/get-user-data?id=` + id);
}


getMyDocuments(id:any): Observable<any[]>{

  return this.http.get<any[]>(`${this.apiUrl}/api/get-my-documents?id=` + id);
}

getReceivedDocs(id:any): Observable<any[]>{

  return this.http.get<any[]>(`${this.apiUrl}/api/get-received-documents?id=` + id);
}

getForwardedDocs(id:any): Observable<any[]>{

  return this.http.get<any[]>(`${this.apiUrl}/api/get-forwarded-documents?id=` + id);
}

getIncomingDocs(id:any): Observable<any[]>{

  return this.http.get<any[]>(`${this.apiUrl}/api/get-incoming-documents?id=` + id);
}


getHistoryDocs(id:any): Observable<any[]>{

  return this.http.get<any[]>(`${this.apiUrl}/api/get-history?t=` + id);
}

getDocumentData(id:any): Observable<any[]>{

  return this.http.get<any[]>(`${this.apiUrl}/api/get-document-data?t=` + id);
}


CountMyDashboard(id:any){
  return this.http.get(`${this.apiUrl}/api/count-doc-t?id=` + id);
}

track_document(id:any,tracking_number : any){
  return this.http.get(`${this.apiUrl}/api/track-document?tracking_number=` + tracking_number + '&&id=' + id);
}

//Admin

//Post

verifyAdmin(body:any){
  var error;
  return this.http.post(`${this.apiUrl}/api/verify-admin`,body,this.requestOptions)
}

filter_document_by_date(data: any){
  return this.http.post<any[]>(`${this.apiUrl}/api/filter-by-date`,data, this.requestOptions);
}


addAction(data: any){
  return this.http.post(`${this.apiUrl}/api/add-action`,data, this.requestOptions);
}





//Get
getAllDocuments(): Observable<any[]>{

  return this.http.get<any[]>(`${this.apiUrl}/api/get-all-documents`);
}

CountadminDashboard(){
  return this.http.get(`${this.apiUrl}/api/count-docs`);
}

getActions(): Observable<any[]>{

  return this.http.get<any[]>(`${this.apiUrl}/api/get-actions`);
}

  //PUT


  update_office(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_office/` + id,params,this.requestOptions);
  }

  update_type(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_type/` + id,params,this.requestOptions);
  }

  update_document(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_document/` + id,params,this.requestOptions);
  }

  update_action(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_action/` + id,params,this.requestOptions);
  }


  delete_user(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/remove-user/` + id,params);
  }


  UpdateProfile(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_profile/` + id,params,this.requestOptions);
  }

  
  //DELETE
    
  delete_office(id:any){
    return this.http.delete(`${this.apiUrl}/api/delete-office/` + id,this.requestOptions);
  }

  delete_type(id:any){
    return this.http.delete(`${this.apiUrl}/api/delete-type/` + id,this.requestOptions);
  }

  delete_action(id:any){
    return this.http.delete(`${this.apiUrl}/api/delete-action/` + id,this.requestOptions);
  }


  deleteMyDocs(params:any){
    return this.http.post(`${this.apiUrl}/api/delete-my-document` , params,this.requestOptions);
  }

  remove_user(params:any){
    return this.http.delete(`${this.apiUrl}/api/delete-user/` + params,this.requestOptions);
  }

 }
