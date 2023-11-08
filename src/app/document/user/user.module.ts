import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserNavigationComponent } from './layout/user-navigation/user-navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataTablesModule } from 'angular-datatables';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { TitleComponent } from '../components/title/title.component';
import { IncomingComponent } from './pages/incoming/incoming.component';
import { ReceivedComponent } from './pages/received/received.component';
import { ForwardedComponent } from './pages/forwarded/forwarded.component';
import { AddDocumentComponent } from './pages/add-document/add-document.component';
import { TrackComponent } from './pages/track/track.component';
import { TrackDocComponent } from './pages/auth/track-doc/track-doc.component';
import { UserDisplayComponent } from './layout/user-display/user-display.component';
import { TrackAllComponent } from './pages/track-all/track-all.component';
import { UserDocumentGuard } from 'src/app/service/user-document-guard.service';
import { UpdateDocumentComponent } from './pages/update-document/update-document.component';
import {MatMenuModule} from '@angular/material/menu';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    UserComponent,
    UserNavigationComponent,
    LoginComponent,
    DashboardComponent,
    MyDocumentsComponent,
    IncomingComponent,
    ReceivedComponent,
    ForwardedComponent,
    AddDocumentComponent,
    TrackComponent,
    TrackDocComponent,
    UserDisplayComponent,
    TrackAllComponent,
    UpdateDocumentComponent,
    

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    MatMenuModule,
    EditorModule
  ],
  providers: [UserDocumentGuard],
})
export class UserModule { }
