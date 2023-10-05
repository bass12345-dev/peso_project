import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OfficesComponent } from './pages/offices/offices.component';
import { DocumentTypesComponent } from './pages/document-types/document-types.component';
import { UsersComponent } from './pages/users/users.component';
import { AllDocumentsComponent } from './pages/all-documents/all-documents.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent,
  children : [
    { path : 'dashboard', component : DashboardComponent},
    { path : 'offices', component : OfficesComponent},
    { path : 'document-types', component : DocumentTypesComponent},
    { path : 'users', component : UsersComponent},
    { path : 'documents', component : AllDocumentsComponent},
    
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
