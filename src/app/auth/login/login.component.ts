import { login, logout } from './../auth.actions';
import { AppState } from './../reducers/index';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const { email, password } = this.form.value;

    this.auth
      .login(email, password)
      .pipe(
        tap((user) => {
          console.log('user', user);

          let action = login({ user });
          // let action = {
          //   type: 'Login Action',
          //   payload: {
          //     userProfile: user,
          //   },
          // };
          this.store.dispatch(action);

          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(noop, () => console.log('Login failed!'));
  }

  logout() {
    // this.auth.l
  }
}
