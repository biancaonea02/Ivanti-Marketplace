import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/auth/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { NotificationService } from 'src/app/auth/service/notification.service';
import { Package } from 'src/app/model/package';
import { PackageService } from 'src/app/_services/package-service/package-service';

@Component({
  selector: 'app-uploaded-packages',
  templateUrl: './uploaded-packages.component.html',
  styleUrls: ['./uploaded-packages.component.css']
})
export class UploadedPackagesComponent implements OnInit {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  public packages: Package[];

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService, private packageService: PackageService) { }

  ngOnInit(): void {
    this.showUploadedPackages();
  }

  public showUploadedPackages(): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.packageService.getUploadedPackagesOfUser(this.authenticationService.getUserFromLocalCache().id).subscribe( // we get user from the back-end
        (response: HttpResponse<Package[]>) => {
          this.packages = response.body;
          this.showLoading = false; // stop showing loading on button
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
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
