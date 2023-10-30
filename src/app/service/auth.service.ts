import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";


export class AuthService{

    constructor(private http: HttpClient) { }
    apiUrl = 'http://127.0.0.1:8000';
    s : any ; 

    VerifyBlacklistedAdmin(){

        this.http.post(`${this.apiUrl}/api/verify-b`,localStorage.getItem('permissions')).subscribe((data : any) =>{
            if(data.response) {
                return true;
            }else {
                return false;
            }
        })

    }
}