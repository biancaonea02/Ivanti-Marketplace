import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from '../auth/enum/notification-type.enum';
import { AuthenticationService } from '../auth/service/authentication.service';
import { NotificationService } from '../auth/service/notification.service';
import { Role } from '../model/role';
import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private notificationService: NotificationService, private router: Router, private authService: AuthenticationService) {
  }

  loggedIn: boolean = false;
  contentCreator: boolean = false;
  //isUserIncremented: boolean;
  user: User;


  ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
    this.contentCreator = this.authService.isUserContentCreator();
  }


  showMenu: boolean = true;

  toggle() {
    if (this.showMenu) { this.showMenu = false }
    else { this.showMenu = true }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, 'You have been logged out successfully');
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  isFirstTime(): boolean {
    if (this.user.firstTime == true) {
      return true;
    }
    else {
      return false;
    }
  }

  public get isCustomer(): boolean {
    if (this.getUserRole() != null) {
      return this.getUserRole() === "ROLE_CUSTOMER";
    }
    return false;
  }

  public get isContentCreator(): boolean {
    if (this.getUserRole() != null) {
      if(this.getUserRole() === "ROLE_CONTENT_CREATOR") {
        return true;
      }
    }
    return false;
  }

  public get isNone(): boolean {
    if (this.getUserRole() != null) {
      return false;
    }
    return true;
  }

  public isUserLoggedIn(): boolean {
    if (this.authService.isUserLoggedIn()) {
      this.loggedIn = true;
    }
    return false;
  }

  private getUserRole(): string {
    if (this.authService.getUserFromLocalCache() != null) {
      for(const role of this.authService.getUserFromLocalCache().roles) {
        if(role.name == "ROLE_CONTENT_CREATOR") {
          return role.name;
        }
      }
      for(const role of this.authService.getUserFromLocalCache().roles) {
        if(role.name == "ROLE_CUSTOMER") {
          return role.name;
        }
      }
    }
    return null;
  }

}
