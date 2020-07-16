import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user.model';
import { APP } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private user: User;

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.getCachedValues();
  }

  set userData(userData: User) {
    this.user = userData;
    this.localStorageService.cacheData(APP.cache.userData, userData);
  }

  get userData() {
    return this.user;
  }

  private getCachedValues(): void {
    this.user = this.localStorageService.getCachedData(APP.cache.userData);
  }

}
