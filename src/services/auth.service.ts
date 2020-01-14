import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HelperService } from './helper.service';
import { map, tap } from 'rxjs/operators';
import * as cryptojs from 'crypto-js';

/**
 * The auth user service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private helper: HelperService, public router: Router) {}

  /**
   * Overriden canActivate method of interface
   * @return true if user is logged in else false
   */
  canActivate(): boolean {
    if (!this.getUser()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  /**
   * gets user object stored in sessionStorage
   * @return user object
   */
  getUser(): any {
    return JSON.parse(sessionStorage.getItem('user')) || {};
  }

  /**
   * login function
   * @return Observable of user object
   */
  login(username, password): any {
    const hashedUsername = cryptojs.HmacSHA256(username, 'abbrcs').toString();
    const hashedPassword = cryptojs.HmacSHA256(password, 'abbrcs').toString();

    return this.helper
      .get('/assets/data/UserCredentials.json')
      .pipe(map(credentials => {
        return credentials.filter(c => c.hashedUsername === hashedUsername && c.hashedPassword === hashedPassword)[0];
      }))
      .pipe(tap(match => {
        if (!match) {
          throw new Error('No such user exists');
        }
        sessionStorage.setItem('user', JSON.stringify(match));
      }));
  }

}
