import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlacklistedRoutingModule } from './blacklisted-routing.module';
import { BlacklistedComponent } from './blacklisted.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CountCardComponent } from './pages/dashboard/dashboard_components/count-card/count-card.component';
import { SearchComponent } from './pages/dashboard/dashboard_components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActiveListComponent } from './pages/active-list/active-list.component';
import {DataTablesModule} from 'angular-datatables';



@NgModule({
  declarations: [
    BlacklistedComponent,
    NavigationComponent,
    DashboardComponent,
    CountCardComponent,
    SearchComponent,
    ActiveListComponent,

   
  ],
  imports: [
    CommonModule,
    BlacklistedRoutingModule,
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
    
  ]
})
export class BlacklistedModule { }
