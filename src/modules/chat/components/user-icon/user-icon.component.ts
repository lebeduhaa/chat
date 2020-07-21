import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  templateUrl: 'user-icon.component.html',
  styleUrls: ['user-icon.component.scss']
})
export class UserIconComponent {

  @Input() imgUrl: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() color: string;
  
}
