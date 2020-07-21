import { Component, OnInit } from '@angular/core';

import { Unsubscribe } from 'src/modules/shared/classes/unsubscribe.class';
import { SubjectService } from 'src/modules/shared/services/subject.service';
import { APP } from 'src/modules/shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss']
})
export class RootComponent extends Unsubscribe implements OnInit {

  public spinnerVisibility: boolean;

  constructor(
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToSpinnerVisibility();
  }

  private subscribeToSpinnerVisibility(): void {
    this.subscribeTo = this.subjectService.getSubject(APP.subjects.spinnerVisibility)
      .subscribe(spinnerVisibility => this.spinnerVisibility = spinnerVisibility);
  }

}
