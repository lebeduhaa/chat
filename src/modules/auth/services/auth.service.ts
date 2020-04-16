import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'

import { SubjectService } from 'src/modules/shared/services/subject.service';
import { APP } from 'src/modules/shared/constants';
import { NotificationService } from 'src/modules/shared/services/notification.service';
import { RouterService } from 'src/modules/shared/services/router.service';
import { LocalStorageService } from 'src/modules/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private subjectService: SubjectService,
    private firebaseFireStore: AngularFirestore,
    private notificationService: NotificationService,
    private routerService: RouterService,
    private localStorageService: LocalStorageService
  ) {}

  public async signUp(nickname: string, email: string, password: string): Promise<void> {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);

    const signUpResult = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);

    await signUpResult.user.sendEmailVerification();
    await this.firebaseFireStore.collection('users').add({nickname, email});
    this.notificationService.showSuccessMessage('Sign Up', 'Please, verify your email and sign in');
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
    this.routerService.navigateToPage(APP.pages.signIn);
  }

  public async signIn(email: string, password: string): Promise<void> {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);

    const signInResult = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
  
    if (signInResult.user.emailVerified) {
      const usersSnapshot = await this.firebaseFireStore.collection('users').ref.where('email', '==', email).get();
      const userData = usersSnapshot.docs[0].data();

      this.localStorageService.cacheData(APP.cache.userData, userData);
      this.routerService.navigateToPage(APP.pages.profile);
      this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
    } else {
      await this.firebaseAuth.signOut();

      throw Error('Sorry, but your email is not verified');
    }
  }

}
