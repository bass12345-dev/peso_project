import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers : any

  constructor(private http: HttpClient) { }

  // apiUrl = 'http://127.0.0.1:8000';

  apiUrl = 'http://192.168.1.25/cpesd-api/public';
  // apiUrl = 'https://basil-project.000webhostapp.com/public';


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

      ChangeCode(data: any,id :any){
        return this.http.post(`${this.apiUrl}/api/change-code?id=` + id,data);
      }


  //GET

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
    return this.http.put(`${this.apiUrl}/api/add_record/` + id,params);
  }


  update_record(record_id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_record/` + record_id,params);
  }

    set_active(id:any, item : any){

      return this.http.put(`${this.apiUrl}/api/set-active/` + id,item);
  
    }

    remove(id:any, item : any){
      return this.http.put(`${this.apiUrl}/api/remove/` + id,item);
    }

    update_person_info(id:any,params : any){
      return this.http.put(`${this.apiUrl}/api/update-person-info/` + id,params);
    }
  
  //DELETE
    

    delete(id : any){

      return this.http.delete(`${this.apiUrl}/api/delete/` + id);
    }


    delete_record(id:any){
      return this.http.delete(`${this.apiUrl}/api/delete-record/` + id);
    }



     //                  Document Tracking                //

  //POST



      //Add Data
      addOffice(data: any){
        return this.http.post(`${this.apiUrl}/api/add-office`,data);
      }

      addType(data: any){
        return this.http.post(`${this.apiUrl}/api/add-document-type`,data);
      }

      verifyUser(body:any){
        return this.http.post(`${this.apiUrl}/api/verify-user`,body);
      }

      addDocument(data: any){
        return this.http.post(`${this.apiUrl}/api/add-document`,data);
      }

      ForwardDocs(data: any){
        return this.http.post(`${this.apiUrl}/api/forward-document`,data);
      }

      ReceivedDoc(data: any){
        return this.http.post(`${this.apiUrl}/api/receive-document`,data);
      }

      CompletedDoc(data: any){
        return this.http.post(`${this.apiUrl}/api/complete-document`,data);
      }

      


      Register(data: any){
        return this.http.post(`${this.apiUrl}/api/register`,data);
      }

  //GET

  getLast(){
    return this.http.get<any>(`${this.apiUrl}/api/get-last`);
} 


    getOffices(){
      return this.http.get<any[]>(`${this.apiUrl}/api/offices`);
  } 

  

  getTypes(){
    return this.http.get<any[]>(`${this.apiUrl}/api/get-document-types`);
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
  return this.http.post(`${this.apiUrl}/api/verify-admin`,body);
}

addAction(data: any){
  return this.http.post(`${this.apiUrl}/api/add-action`,data);
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
    return this.http.put(`${this.apiUrl}/api/update_office/` + id,params);
  }

  update_type(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_type/` + id,params);
  }

  update_document(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_document/` + id,params);
  }

  update_action(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/update_action/` + id,params);
  }


  delete_user(id:any,params : any){
    return this.http.put(`${this.apiUrl}/api/remove-user/` + id,params);
  }

  
  //DELETE
    
  delete_office(id:any){
    return this.http.delete(`${this.apiUrl}/api/delete-office/` + id);
  }

  delete_type(id:any){
    return this.http.delete(`${this.apiUrl}/api/delete-type/` + id);
  }

  delete_action(id:any){
    return this.http.delete(`${this.apiUrl}/api/delete-action/` + id);
  }


  deleteMyDocs(id:any){
    return this.http.delete(`${this.apiUrl}/api/delete-my-document/` + id);
  }





 }
