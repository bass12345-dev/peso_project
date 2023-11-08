import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OfficesComponent } from './pages/offices/offices.component';
import { DocumentTypesComponent } from './pages/document-types/document-types.component';
import { UsersComponent } from './pages/users/users.component';
import { AllDocumentsComponent } from './pages/all-documents/all-documents.component';
import { AdminDocumentGuard } from 'src/app/service/admin-document-guard.service';
import { TrackComponent } from './pages/track/track.component';
import { FinalActionTakenComponent } from './pages/final-action-taken/final-action-taken.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate : [AdminDocumentGuard],
  children : [
    { path : 'dashboard', component : DashboardComponent},
    { path : 'offices', component : OfficesComponent},
    { path : 'document-types', component : DocumentTypesComponent},
    { path : 'users', component : UsersComponent},
    { path : 'documents', component : AllDocumentsComponent},
    { path : 'track/:id', component : TrackComponent},
    { path : 'final-action-taken', component : FinalActionTakenComponent},
    
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
