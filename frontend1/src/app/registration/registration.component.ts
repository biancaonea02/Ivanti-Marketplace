import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../auth/enum/notification-type.enum';
import { AuthenticationService } from '../auth/service/authentication.service';
import { NotificationService } from '../auth/service/notification.service';
import { User } from '../model/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public showLoading?: boolean;
  private subscriptions: Subscription[] = [];
  public message: string;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { 
      this.message = "";
    }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  public onRegister(name: string, username: string, password: string, email: string): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(name, username, password, email).subscribe(
        (response: User) => {
          this.showLoading = false;
          // this.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.username
          // }.
          // Please check your email for password to log in.`);
          this.message = "Your account was successfully created!";
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
          this.message = "An error occured while processing your request.";
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}

