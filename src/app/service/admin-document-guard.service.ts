import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Location } from '@angular/common';

@Injectable()
export class AdminDocumentGuard implements CanActivate{

    constructor (private router : Router, private location: Location, ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

        if(localStorage.getItem('idd')) {
            // this.router.navigate(['../document/admin/dashboard']);
            return true;
        }else {
            this.router.navigate(['../document/admin/login']);
            return false;
        }
        
    }

}