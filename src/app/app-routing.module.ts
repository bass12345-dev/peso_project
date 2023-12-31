import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { LoginComponent } from './document/user/pages/auth/login/login.component';
import { RegisterComponent } from './document/user/pages/auth/register/register.component';
import { AdminLoginComponent } from './document/admin/pages/auth/admin-login/admin-login.component';
import { TrackDocComponent } from './document/user/pages/auth/track-doc/track-doc.component';
import { BlacklistedAuthGuardService } from './service/blacklisted-auth-guard.service';
import { UserDocumentGuard } from './service/user-document-guard.service';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'blacklisted', loadChildren: () => import('./blacklisted/blacklisted.module').then(m => m.BlacklistedModule), canActivate : [BlacklistedAuthGuardService] },
  { path: 'document', loadChildren: () => import('./document/document.module').then(m => m.DocumentModule) },
  { path: 'document/login', component: LoginComponent},
  { path: 'document/register', component: RegisterComponent},
  { path: 'document/track', component: TrackDocComponent},
  { path: 'document/admin/login', component: AdminLoginComponent},
  { path: 'document/admin', loadChildren: () => import('./document/admin/admin.module').then(m => m.AdminModule), canActivate : [UserDocumentGuard] },
  { path: 'document/user', loadChildren: () => import('./document/user/user.module').then(m => m.UserModule) },
  // { path: 'admin/login', component: LoginComponentAdmin},
  // { path: 'document/register', component: RegisterComponent},
  // { path: 'document/track', component: TrackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
