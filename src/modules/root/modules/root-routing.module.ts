import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignUpComponent } from 'src/modules/auth/components/sign-up/sign-up.component';
import { SignInComponent } from 'src/modules/auth/components/sign-in/sign-in.component';
import { ProfileComponent } from 'src/modules/profile/component/profile.component';
import { ChatComponent } from 'src/modules/chat/components/chat/chat.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'chat', component: ChatComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RootRoutingModule {}
