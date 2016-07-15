import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  template: `
    <h3>Please sign up yo use all features</h3>
    <form [formGroup]="myForm" (ngSubmit)="onSignup()">
      <div class="form-group">
        <label for="email">E-Mail</label>
        <input formControlName="email" class="form-control" type="email" id="email" #email>
        <span *ngIf="!email.pristine && email.errors != null && email.errors['noEmail']">Invalid mail adress</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input formControlName="password" class="form-control" type="password" id="password">
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm password</label>
        <input formControlName="confirmPassword" type="password" class="form-control" id="confirm-password" #confirmPassword>
        <span *ngIf="!confirmPassword.pristine && confirmPassword.errors != null && confirmPassword.errors['passwordsNotMatch']">Password do not match</span>
      </div>
      <button type="submit" [disabled]="!myForm.valid" class="btn btn-primary">Sign Up</button>
    </form>
    
`,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSignup() {
    this.authService.signupUser(this.myForm.value);
  }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])],
    });
  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.myForm) {
      return {passwordsNotMatch: true};
    }
    if (control.value !== this.myForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

}
