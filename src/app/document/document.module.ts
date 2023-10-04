import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { TitleComponent } from './components/title/title.component';
import { LoginComponent } from './user/pages/auth/login/login.component';
import { RegisterComponent } from './user/pages/auth/register/register.component';
import { DashboardComponent } from './user/pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DocumentComponent,
    TitleComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
