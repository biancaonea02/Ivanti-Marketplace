import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NotificationType } from "src/app/auth/enum/notification-type.enum";
import { NotificationService } from "src/app/auth/service/notification.service";
import { Package } from "src/app/model/package";
import { SystemRequirements } from "src/app/model/systemRequirements";
import { PackageVersion } from "src/app/model/version";
import { PackageService } from "src/app/_services/package-service/package-service";

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})

export class AddPackageComponent implements OnInit {
  newPackage: Package;
  newSystemRequirements: SystemRequirements;
  newVersion: PackageVersion;
  message: string

  constructor(private packageService: PackageService, private notificationService: NotificationService) {
    this.message = "";
  }

  ngOnInit(): void {
  }

  // public onFileChange(event: any): void {
  //   let file = event.srcElement.files;
  //   this.file = file;
  //   event = null;
  // }

  public onAddNewPackage(name: string, description: string, intro: string, versionName: string, versionReadMe: string, processorType: string, ram: string, graphicsCard: string): void {
    this.packageService.createNewPackage(name, description, intro, versionName, versionReadMe, processorType, ram, graphicsCard).subscribe(
      (response: Package) => {
        this.packageService.addVersionToPackage(response.id, versionName, versionReadMe).subscribe(
          (resp: Package) => {

            this.sendNotification(NotificationType.SUCCESS, `Version added succesfully`);
          },

          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error);
            this.message = errorResponse.error;
          }
        )
        this.sendNotification(NotificationType.SUCCESS, `Package added succesfully`);
        this.message = "The package was successfully added!"
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error);
        this.message = errorResponse.error;
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