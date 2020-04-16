import { ErrorHandler, Injectable} from '@angular/core';

import { FirebaseError } from 'firebase';

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
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
    this.notificationService.showErrorMessage('ERROR', error.rejection.message);
  }
  
}
