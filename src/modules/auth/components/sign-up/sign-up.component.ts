import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from 'src/modules/shared/validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent {

  public signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  public signUp(): void {
    this.authService.signUp(
      this.signUpForm.value.nickname,
      this.signUpForm.value.email,
      this.signUpForm.value.password
    );
  }

  private initForm(): void {
    this.signUpForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: [
        confirmPasswordValidator
      ]
    });
  }

}
