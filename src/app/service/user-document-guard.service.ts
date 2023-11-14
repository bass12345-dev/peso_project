import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable()
export class UserDocumentGuard implements CanActivate{
    local_id : any = '';

    constructor(private router : Router, private apiService : ApiService, ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any  {

        // if(localStorage.getItem('id')) {
        //     // this.router.navigate(['/document/user/dashboard']);
        //     return true;
        // }else {
        //     this.router.navigate(['../document/login']);
        //     return false;
        // }

        this.local_id = localStorage.getItem('id');
        this.apiService.verify_dt_user(atob(this.local_id)).subscribe((data:any)=> {

            if(data.response) {
               
                return true;
            }else {
                this.router.navigate(['../document/login']);
                return false;
            }

        });
        
    }

}