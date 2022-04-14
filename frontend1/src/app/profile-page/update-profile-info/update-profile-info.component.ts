import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/auth/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { NotificationService } from 'src/app/auth/service/notification.service';
import { UserService } from 'src/app/auth/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-update-profile-info',
  templateUrl: './update-profile-info.component.html',
  styleUrls: ['./update-profile-info.component.css']
})
export class UpdateProfileInfoComponent implements OnInit {

  public loggedInUser: User;
  public message: string;


  constructor(private authenticationService: AuthenticationService, private userService: UserService, private notificationService: NotificationService) {
    this.loggedInUser = authenticationService.getUserFromLocalCache();
    this.message = "";
  }

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getUserFromLocalCache();
  }

  public onUpdateCurrentUser(name: string, email: string): void {
    const formData = this.userService.createUserFormDataUpdate(this.loggedInUser.id, name, email);

    this.userService.updateUser(formData).subscribe(
      (response: User) => {
        this.authenticationService.addUserToLocalCache(response);
        this.sendNotification(NotificationType.SUCCESS, `${response.name} ${response.email} updated successfully`)
        this.message = "The profile was successfully updated!";
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.message = "An error occured while processing the request. Please try again.";
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
