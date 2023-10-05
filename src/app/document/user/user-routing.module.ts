import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';

const routes: Routes = [
  { path: 'user', component: UserComponent  ,
  children : [
    { path : 'dashboard', component : DashboardComponent},
    { path : 'my-document', component : MyDocumentsComponent},
    
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
