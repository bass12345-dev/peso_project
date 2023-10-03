import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlacklistedComponent } from './blacklisted.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ActiveListComponent } from './pages/active-list/active-list.component';

const routes: Routes = [
  { path: 'blacklisted', component: BlacklistedComponent,
  children : [
    { path : 'dashboard', component : DashboardComponent},
    { path : 'list', component : ActiveListComponent},
   
    
    
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlacklistedRoutingModule { }
