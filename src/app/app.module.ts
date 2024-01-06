import {  Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataTablesModule} from 'angular-datatables';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './welcome/welcome_components/toolbar/toolbar.component';
import { AppLinksComponent } from './welcome/welcome_components/app-links/app-links.component';
import { CarouselComponent } from './welcome/welcome_components/carousel/carousel.component';
import { BlacklistedModule } from './blacklisted/blacklisted.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlacklistedAuthGuardService } from './service/blacklisted-auth-guard.service';
import { UserDocumentGuard } from './service/user-document-guard.service';
import { MatIconModule } from '@angular/material/icon';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { MatTableModule } from '@angular/material/table';


// Add these two
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Export this function
export function playerFactory(): any {  
  return import('lottie-web');
}



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ToolbarComponent,
    AppLinksComponent,
    CarouselComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BlacklistedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatTableModule,
    LottieModule.forRoot({ player: playerFactory }),  
   

  ],
  exports : [RouterModule],
  providers: [BlacklistedAuthGuardService, UserDocumentGuard, 
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
