import { SubjectService } from '../services/subject.service';
import { APP } from '../constants';

export class Service {

  constructor(
    protected subjectService: SubjectService
  ) {}

  protected showSpinner(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
  }

  protected hideSpinner(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
  }

}
