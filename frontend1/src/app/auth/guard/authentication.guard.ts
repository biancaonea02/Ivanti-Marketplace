import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.isUserLoggedIn(next, url);
  }
  
  // private isUserLoggedIn(): boolean {
  //   if(this.authenticationService.isUserLoggedIn()) {
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   this.notificationService.notify(NotificationType.ERROR, `YOU NEED TO LOG IN TO ACCESS THIS PAGE`);
  //   return false;
  // }

  private isUserLoggedIn(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      const userRole = this.authenticationService.getUserFromLocalCache().roles;
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
