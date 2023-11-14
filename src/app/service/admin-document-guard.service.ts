import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Location } from '@angular/common';
import { ApiService } from "./api.service";

@Injectable()
export class AdminDocumentGuard implements CanActivate{

    local_id : any = '';

    constructor (private router : Router, private location: Location, private apiService : ApiService, ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any  {

        // if(localStorage.getItem('idd')) {
        //     // this.router.navigate(['../document/admin/dashboard']);
        //     return true;
        // }else {
        //     this.router.navigate(['../document/admin/login']);
        //     return false;
        // }
        this.local_id = localStorage.getItem('idd');
        this.apiService.verify_dt_admin(atob(this.local_id)).subscribe((data:any)=> {

            if(data.response) {
                return true;
            }else {
                this.router.navigate(['../document/admin/login']);
                return false;
            }

        });
        
    }

}