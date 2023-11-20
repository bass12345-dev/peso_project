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
import { AddComponent } from './pages/add/add.component';
import { InactiveListComponent } from './pages/inactive-list/inactive-list.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { PersonInfoComponent } from './pages/view-profile/components/person-info/person-info.component';
import { PersonRecordsComponent } from './pages/view-profile/components/person-records/person-records.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule } from '@angular/material/paginator';
import { TitleComponent } from './components/title/title.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UpdateComponent } from './pages/update/update.component';
import { SecurityCodeComponent } from './pages/security-code/security-code.component';
import { BlacklistedAuthGuardService } from '../service/blacklisted-auth-guard.service';
import { AuthService } from '../service/auth.service';
import { ChartComponent } from './pages/dashboard/dashboard_components/chart/chart.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    BlacklistedComponent,
    NavigationComponent,
    DashboardComponent,
    CountCardComponent,
    SearchComponent,
    ActiveListComponent,
    AddComponent,
    InactiveListComponent,
    ViewProfileComponent,
    PersonInfoComponent,
    PersonRecordsComponent,
    TitleComponent,
    UpdateComponent,
    SecurityCodeComponent,
    ChartComponent,

   
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
    MatFormFieldModule,
    MatInputModule,  
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatMenuModule,
  
    
  ],
  providers: [BlacklistedAuthGuardService,],
})
export class BlacklistedModule { }
