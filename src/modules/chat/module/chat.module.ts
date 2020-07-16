import { NgModule } from '@angular/core';

import { SharedModule } from 'src/modules/shared/modules/shared.module';
import { ChatComponent } from '../components/chat/chat.component';
import { MaterialModule } from 'src/modules/shared/modules/material.module';
import { UserIconComponent } from '../components/user-icon/user-icon.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    ChatComponent,
    UserIconComponent
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {}
