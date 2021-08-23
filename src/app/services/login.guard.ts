import { Injectable } from '@angular/core';
import {
  Router, CanActivate,
} from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const user = await this.authenticationService.authenticatedUser.pipe(first()).toPromise();
    if (!user) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
