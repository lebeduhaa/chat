import { OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

export class Unsubscribe implements OnDestroy {

  private subscriptions: Subscription[] = [];

  public set subscribeTo(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
