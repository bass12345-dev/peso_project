import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  badge : any;


  menus : any[] = [
              
    {
      'title' : 'Dashboard',
      'icon'  : 'fa-tachometer',
      'url'   : 'dashboard',
      'class' : '',
      'badge' : ''
    },
    {
      'title' : 'My Documents',
      'icon'  : 'fa-file',
      'url'   : 'my-document',
      'class' : '',
      'badge' : ''
    },
    {
      'title' : 'Incoming',
      'icon'  : 'fa-arrow-left',
      'url'   : 'incoming',
      'class' : '',
      'badge' : '',
    },
    {
      'title' : 'Received',
      'icon'  : 'fa-arrow-down',
      'url'   : 'received',
      'class' : '',
      'badge' : '',
    },
    {
      'title' : 'Forwarded',
      'icon'  : 'fa-arrow-right',
      'url'   : 'forwarded',
      'class' : '',
      'badge' : '',
    },
    {
      'title' : 'Track Documents',
      'icon'  : 'fa-eye',
      'url'   : 'track-documents',
      'class' : '',
      'badge' : ''
    }
];
  
  constructor(
    private location: Location, 
    public router: Router,
    private apiService :ApiService, 
  
  ) {}

  // ngOnInit(){
  //     const id = localStorage.getItem("id");
  //     this.apiService.CountMyDashboard(id).subscribe((items: any) => {


    

  //       this.menus =  [
              
  //         {
  //           'title' : 'Dashboard',
  //           'icon'  : 'fa-tachometer',
  //           'url'   : 'dashboard',
  //           'class' : '',
  //           'badge' : ''
  //         },
  //         {
  //           'title' : 'My Documents',
  //           'icon'  : 'fa-file',
  //           'url'   : 'my-document',
  //           'class' : '',
  //           'badge' : ''
  //         },
  //         {
  //           'title' : 'Incoming',
  //           'icon'  : 'fa-arrow-left',
  //           'url'   : 'incoming',
  //           'class' : '',
  //           'badge' : items.incoming,
  //         },
  //         {
  //           'title' : 'Received',
  //           'icon'  : 'fa-arrow-down',
  //           'url'   : 'received',
  //           'class' : '',
  //           'badge' : items.received,
  //         },
  //         {
  //           'title' : 'Forwarded',
  //           'icon'  : 'fa-arrow-right',
  //           'url'   : 'forwarded',
  //           'class' : '',
  //           'badge' : items.forwarded,
  //         },
  //         {
  //           'title' : 'Track Documents',
  //           'icon'  : 'fa-eye',
  //           'url'   : 'track-documents',
  //           'class' : '',
  //           'badge' : ''
  //         }
  //     ];
        

  //     });
  // }



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout(){     
      localStorage.removeItem("id");
      this.router.navigate(['../document/login']);
  }

  view_my_profile(){
    this.router.navigate(['../document/user/my-profile']);
  }
}
