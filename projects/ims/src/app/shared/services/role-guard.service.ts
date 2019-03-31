import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { AuthService } from './auth.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  constructor(
    private _router: Router,
    private snackBar: SnackBarService,
    private auth: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If reload, this will retrieve current local saved user and pass it to user$
    this.auth.getUser();
    // Process user$ observable
    return this.auth.user$.pipe(
      // Validate user data from user$ observable w/role required on the route
      switchMap(userData => this.validateUser(userData, next.data.role)),
      // If user cannot pass validation, display feedback to user
      tap(val => (!val ? this.snackBar.open('Not allowed', 'Ok') : null))
    );
  }
  // Validation function w/role required and user data
  validateUser(userData, requiredRole: string): Observable<boolean> {
    // If there are not user data return observable false
    if (!userData) {
      return of(false);
    }
    // Return boolean observable depending on the role validation
    return of(
      requiredRole === 'admin'
        ? userData.role === 'admin'
          ? true
          : false
        : userData.role !== ''
        ? true
        : false
    );
  }
}
