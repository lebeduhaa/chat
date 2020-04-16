import { Injectable } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private options = {
    timeOut: 10000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(
    private notificationsService: NotificationsService
  ) {}

  public showSuccessMessage(title: string, content: string): void {
    this.notificationsService.success(title, content, this.options);
  }

  public showErrorMessage(title: string, content: string): void {
    this.notificationsService.error(title, content, this.options);
  }

}
