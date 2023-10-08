import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';


import { RegisterComponent } from './user/pages/auth/register/register.component';
import { DashboardComponent } from './user/pages/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';






@NgModule({
  declarations: [
    DocumentComponent,
    RegisterComponent,
   
 



 
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AdminModule,
    UserModule
    
  ]
})
export class DocumentModule { }
