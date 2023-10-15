import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  menus : any[] = [
              
    {
      'title' : 'Dashboard',
      'icon'  : 'fa-tachometer',
      'url'   : 'dashboard',
      'class' : ''
    },
    {
      'title' : 'My Documents',
      'icon'  : 'fa-file',
      'url'   : 'my-document',
      'class' : ''
    },
    {
      'title' : 'Incoming',
      'icon'  : 'fa-arrow-left',
      'url'   : 'incoming',
      'class' : ''
    },
    {
      'title' : 'Received',
      'icon'  : 'fa-arrow-down',
      'url'   : 'received',
      'class' : ''
    },
    {
      'title' : 'Forwarded',
      'icon'  : 'fa-arrow-right',
      'url'   : 'forwarded',
      'class' : ''
    },
    {
      'title' : 'Track Documents',
      'icon'  : 'fa-eye',
      'url'   : 'track-documents',
      'class' : ''
    }
];
  
  constructor(
    private location: Location, 
    public router: Router
  
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout(){     
      localStorage.removeItem("id");
      this.router.navigate(['../document/login']);
  }
}
