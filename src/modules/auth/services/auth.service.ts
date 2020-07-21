import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase';

import { SubjectService } from 'src/modules/shared/services/subject.service';
import { APP } from 'src/modules/shared/constants';
import { NotificationService } from 'src/modules/shared/services/notification.service';
import { RouterService } from 'src/modules/shared/services/router.service';
import { SharedDataService } from 'src/modules/shared/services/shared-data.service';
import { User } from 'src/modules/shared/models/user.model';
import { GoogleAuthResponse } from 'src/modules/shared/models/google-auth-response.model';
import { Service } from 'src/modules/shared/classes/service.class';
import { getRandomColor } from 'src/modules/shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  constructor(
    protected subjectService: SubjectService,
    private firebaseAuth: AngularFireAuth,
    private firebaseFireStore: AngularFirestore,
    private notificationService: NotificationService,
    private routerService: RouterService,
    private sharedDataService: SharedDataService
  ) {
    super(subjectService);
  }

  public async googleAuthentication(): Promise<void> {
    this.showSpinner();

    const provider = new firebase.auth.GoogleAuthProvider();
    const authenticationResult: GoogleAuthResponse = <unknown>(await this.firebaseAuth.signInWithPopup(provider)).additionalUserInfo.profile as GoogleAuthResponse;

    if (authenticationResult.verified_email) {
      const userData: User = {
        firstName: authenticationResult.given_name,
        email: authenticationResult.email,
        lastName: authenticationResult.family_name,
        picture: authenticationResult.picture
      };
  
      const user = (await this.firebaseFireStore.collection('users').ref.where('email', '==', userData.email).get()).docs[0];

      if (!user) {
        const id = this.firebaseFireStore.createId();

        userData.id = id;
        await this.firebaseFireStore.collection('users').doc(id).set({id, isOnline: true, ...userData});
      } else {
        userData.id = user.data().id;
        await this.firebaseFireStore.collection('users').doc(userData.id).update({isOnline: true});
      }

      this.sharedDataService.userData = userData;
      this.routerService.navigateToPage(APP.pages.chat);
      this.hideSpinner();
    } else {
      await this.firebaseAuth.signOut();

      this.hideSpinner();
      throw Error('Sorry, but your email is not verified');
    }
  }

  public async signUp(user: User): Promise<void> {
    this.showSpinner();

    const signUpResult = await this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password);
    const id = this.firebaseFireStore.createId();
    const { password, ...userData } = user;

    await signUpResult.user.sendEmailVerification();
    await this.firebaseFireStore.collection('users').doc(id).set({id, ...userData, color: getRandomColor()});
    this.notificationService.showSuccessMessage('Sign Up', 'Please, verify your email and sign in');
    this.hideSpinner();
    this.routerService.navigateToPage(APP.pages.signIn);
  }

  public async signIn(email: string, password: string): Promise<void> {
    this.showSpinner();

    const signInResult = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
  
    if (signInResult.user.emailVerified) {
      const usersSnapshot = await this.firebaseFireStore.collection('users').ref.where('email', '==', email).get();
      const userData: User = usersSnapshot.docs[0].data() as User;

      await usersSnapshot.docs[0].ref.update({isOnline: true});
      this.sharedDataService.userData = userData;
      this.routerService.navigateToPage(APP.pages.chat);
      this.hideSpinner();
    } else {
      await this.firebaseAuth.signOut();

      this.hideSpinner();
      throw Error('Sorry, but your email is not verified');
    }
  }

  public async signOut(): Promise<void> {
    this.showSpinner();
    await this.firebaseFireStore.collection('users').doc(this.sharedDataService.userData.id).update({isOnline: false});
    this.firebaseAuth.signOut();
    this.sharedDataService.userData = null;
    this.routerService.navigateToPage(APP.pages.signIn);
    this.hideSpinner();
  }

}
