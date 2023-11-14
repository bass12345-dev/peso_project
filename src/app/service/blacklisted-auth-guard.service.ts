import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable()
export class BlacklistedAuthGuardService implements CanActivate {
    local_id : any = '';
    constructor(private router : Router, private apiService : ApiService, ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {


        this.local_id = localStorage.getItem('permissions');
        this.apiService.verify_blacklisted_user(atob(this.local_id)).subscribe((data:any)=> {

            if(data.response) {
                return true;
            }else {
                this.router.navigate(['']);
                return false;
            }

        });

        // if(localStorage.getItem('permissions')) {
        //     return true;
        // }else {
        //     this.router.navigate(['']);
        //     return false;
        // }

       

    }
}