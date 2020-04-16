import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/modules/shared/modules/shared.module';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { MaterialModule } from 'src/modules/shared/modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AuthModule {}
