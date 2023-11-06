import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { AddDocumentComponent } from './pages/add-document/add-document.component';
import { ReceivedComponent } from './pages/received/received.component';
import { IncomingComponent } from './pages/incoming/incoming.component';
import { ForwardedComponent } from './pages/forwarded/forwarded.component';
import { TrackComponent } from './pages/track/track.component';
import { TrackDocComponent } from './pages/auth/track-doc/track-doc.component';
import { TrackAllComponent } from './pages/track-all/track-all.component';
import { UserDocumentGuard } from 'src/app/service/user-document-guard.service';
import { UpdateComponent } from 'src/app/blacklisted/pages/update/update.component';
import { UpdateDocumentComponent } from './pages/update-document/update-document.component';

const routes: Routes = [
  { path: 'user', component: UserComponent  , canActivate : [UserDocumentGuard],
  children : [
    { path : 'dashboard', component : DashboardComponent},
    { path : 'my-document', component : MyDocumentsComponent},
    { path : 'add-documents', component : AddDocumentComponent},
    { path : 'received', component : ReceivedComponent},
    { path : 'incoming', component : IncomingComponent},
    { path : 'forwarded', component : ForwardedComponent},
    { path : 'track/:id', component : TrackComponent},
    { path : 'update-document/:id', component : UpdateDocumentComponent},
    { path : 'track-documents', component : TrackAllComponent},
    
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
