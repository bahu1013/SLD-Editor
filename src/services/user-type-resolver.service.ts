import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeResolverService implements Resolve<String> {

  constructor(private authService: AuthService) { }
  resolve(): string {
    return this.authService.getUser()['role'];
  }
}
