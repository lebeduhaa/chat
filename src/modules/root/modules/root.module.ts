import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { RootComponent } from '../components/root/root.component';
import { environment } from 'src/environments/environment';
import { RootRoutingModule } from './root-routing.module';
import { AuthModule } from 'src/modules/auth/modules/auth.module';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { MaterialModule } from 'src/modules/shared/modules/material.module';
import { GlobalErrorHandler } from 'src/modules/shared/global.error-handler';
import { ProfileModule } from 'src/modules/profile/modules/profile.module';

@NgModule({
  declarations: [
    RootComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    RootRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    AuthModule,
    ProfileModule
  ],
  providers: [
    {
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }
