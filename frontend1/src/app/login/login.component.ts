import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../auth/enum/header-type.enum';
import { NotificationType } from '../auth/enum/notification-type.enum';
import { AuthenticationService } from '../auth/service/authentication.service';
import { NotificationService } from '../auth/service/notification.service';
import { Role } from '../model/role';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }


  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');    ///user/management
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(username: string, password: string): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(username, password).subscribe( // we get user from the back-end
        (response: HttpResponse<User>) => {
          //const token = response.headers.get(HeaderType.JWT_TOKEN) || '{}'; // get the token from the headers
          //this.authenticationService.saveToken(token); // save the token in the local storage
          console.log(response);
          this.authenticationService.addUserToLocalCache(response.body); // add the user to the local storage
          this.router.navigate(['/home']); // navigate the user back to the home page
          this.showLoading = false; // stop showing loading on button
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          localStorage.removeItem('user');
          localStorage.removeItem('username');
          this.showLoading = false;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
