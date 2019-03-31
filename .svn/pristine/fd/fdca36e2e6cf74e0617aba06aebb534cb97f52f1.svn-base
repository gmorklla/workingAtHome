import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  user;
  @Output()
  dataForLogin = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const loginOpts = {
      email: ['', [Validators.required, Validators.email, ValidateDomain]],
      password: ['', [Validators.required, ValidatePassword]]
    };
    const signUpOpts = {
      email: ['', [Validators.required, Validators.email, ValidateDomain]],
      password: ['', [Validators.required, ValidatePassword]],
      confirm: ['', [Validators.required]]
    };
    this.loginForm = this.fb.group(loginOpts);
    this.signUpForm = this.fb.group(signUpOpts, {
      validator: ConfirmPassword
    });
  }

  loginWithEmail() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.dataForLogin.emit({
      email: email,
      password: password,
      type: 'login'
    });
  }

  resetPassword() {
    const email = this.loginForm.get('email').value;
    this.dataForLogin.emit({
      email: email,
      type: 'reset'
    });
  }

  signUpWithEmail() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.dataForLogin.emit({
      email: email,
      password: password,
      type: 'signup'
    });
  }
}

import { AbstractControl } from '@angular/forms';

export function ValidateDomain(control: AbstractControl) {
  const validation = /(gmail.com|hotmail.com|intelmas.com)$/.test(
    control.value
  );
  return validation ? null : { validDomain: true };
}

export function ValidatePassword(control: AbstractControl) {
  const validation = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(
    control.value
  );
  return validation ? null : { validPassword: true };
}

export function ConfirmPassword(control: AbstractControl) {
  const password = control.get('password').value;
  const confirm = control.get('confirm').value;
  const validation = password === confirm;
  return validation ? null : { validPassword: true };
}
