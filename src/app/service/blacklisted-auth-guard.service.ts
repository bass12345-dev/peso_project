import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
// import { AuthService } from "./auth.service";

@Injectable()
export class BlacklistedAuthGuardService implements CanActivate {
    // private authSerivice : AuthService
    constructor(private router : Router,){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // if(this.authSerivice.s) {
        //     return true;
        // }else {
        //     this.router.navigate(['']);
        //     return false;
        // }
        // return true;
        if(localStorage.getItem('permissions')) {
            return true;
        }else {
            this.router.navigate(['']);
            return false;
        }

       

    }
}