import { tap } from 'rxjs/operators';
import { isLoggedIn } from './auth.selectors';
import { AppState } from './../reducers/index';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> {

    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if(!loggedIn) {
          // console.log('loggedIn 2', loggedIn)
          this.router.navigateByUrl('/login')
        }
      })
    )
  }

}
