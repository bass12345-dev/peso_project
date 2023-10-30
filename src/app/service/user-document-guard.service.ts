import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class UserDocumentGuard implements CanActivate{

    constructor (private router : Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

        if(localStorage.getItem('id')) {
            return true;
        }else {
            this.router.navigate(['../document/login']);
            return false;
        }
        
    }

}