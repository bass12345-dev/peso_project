import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlacklistedComponent } from './blacklisted.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ActiveListComponent } from './pages/active-list/active-list.component';
import { AddComponent } from './pages/add/add.component';
import { InactiveListComponent } from './pages/inactive-list/inactive-list.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { UpdateComponent } from './pages/update/update.component';
import { SecurityCodeComponent } from './pages/security-code/security-code.component';

const routes: Routes = [
  { path: 'blacklisted', component: BlacklistedComponent,
  children : [
    { path : 'dashboard', component : DashboardComponent},
    { path : 'list', component : ActiveListComponent},
    { path : 'add', component : AddComponent},
    { path : 'inactive-list', component : InactiveListComponent },
    { path : 'view/:id', component : ViewProfileComponent },
    { path : 'update/:id', component : UpdateComponent },
    { path : 'update-security', component : SecurityCodeComponent },
    
    
    
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlacklistedRoutingModule { }
