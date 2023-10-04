import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'blacklisted', loadChildren: () => import('./blacklisted/blacklisted.module').then(m => m.BlacklistedModule) },
  { path: 'document', loadChildren: () => import('./document/document.module').then(m => m.DocumentModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
