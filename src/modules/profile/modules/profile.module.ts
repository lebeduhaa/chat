import { NgModule } from '@angular/core';

import { SharedModule } from 'src/modules/shared/modules/shared.module';
import { ProfileComponent } from '../component/profile.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule {}
