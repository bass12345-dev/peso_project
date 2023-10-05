import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminNavigationComponent } from './layout/admin-navigation/admin-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataTablesModule } from 'angular-datatables';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CountCardComponent } from './pages/dashboard/dasboard_components/count-card/count-card.component';
import { OfficesComponent } from './pages/offices/offices.component';
import { TitleComponent } from '../components/title/title.component';
import { DocumentTypesComponent } from './pages/document-types/document-types.component';
import { UsersComponent } from './pages/users/users.component';
import { AllDocumentsComponent } from './pages/all-documents/all-documents.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    DashboardComponent,
    AdminNavigationComponent,
    CountCardComponent,
    OfficesComponent,
    TitleComponent,
    DocumentTypesComponent,
    UsersComponent,
    AllDocumentsComponent
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressBarModule,
    DataTablesModule,
    MatFormFieldModule,
    MatInputModule,  
    MatPaginatorModule,
    MatSnackBarModule
  ]
})
export class AdminModule { }
