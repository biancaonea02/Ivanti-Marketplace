import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/auth/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { NotificationService } from 'src/app/auth/service/notification.service';
import { UserService } from 'src/app/auth/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-reset-password-profile',
  templateUrl: './reset-password-profile.component.html',
  styleUrls: ['./reset-password-profile.component.css']
})
export class ResetPasswordProfileComponent implements OnInit {

  public loggedInUser: User;
  public current: string;
  public new: string

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private notificationService: NotificationService) {
    this.loggedInUser = authenticationService.getUserFromLocalCache();
    this.current = "";
    this.new = "";
  }

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getUserFromLocalCache();
  }

  onResetPasswordCurrentUser(currentPassword: string, newPassword: string): void {
    const formData = this.userService.createUserFormDataResetPassword(this.loggedInUser.id, currentPassword, newPassword);

    this.userService.resetPassword(formData).subscribe(
      (response: User) => {
        this.authenticationService.addUserToLocalCache(response);
        this.sendNotification(NotificationType.SUCCESS, "Password reseted successfully");
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    )
  }

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    }
    else {
      this.notificationService.notify(notificationType, "An error has occured.")
    }
  }

}