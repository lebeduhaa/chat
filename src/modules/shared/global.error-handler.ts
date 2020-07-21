import { ErrorHandler, Injectable} from '@angular/core';

import { NotificationService } from './services/notification.service';
import { SubjectService } from './services/subject.service';
import { APP } from './constants';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private notificationService: NotificationService,
    private subjectService: SubjectService
  ) {}
  
  handleError(error) {
    console.error(error);
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
    this.notificationService.showErrorMessage('ERROR', error.message ? error.message : error.rejection.message);
  }
  
}
