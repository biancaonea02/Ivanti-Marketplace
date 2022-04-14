import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/model/package';
import { ActivatedRoute } from '@angular/router';
import { PackageVersion } from 'src/app/model/version';
import { PackageService } from 'src/app/_services/package-service/package-service';
import { NotificationType } from 'src/app/auth/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/auth/service/notification.service';


@Component({
  selector: 'app-update-package-creator',
  templateUrl: './update-package-creator.component.html',
  styleUrls: ['./update-package-creator.component.css']
})
export class UpdatePackageCreatorComponent implements OnInit {

  public currentPackage: Package;
  public versions: PackageVersion[];
  public message: string;

  constructor(private packageService: PackageService, private router: ActivatedRoute, private notificationService: NotificationService) {
    this.message = "";
  }

  ngOnInit(): void {
    this.getPackage();
  }

  public getPackage(): void {
    this.packageService.getPackageById(this.router.snapshot.params.id).subscribe(
      (response: Package) => {
        this.currentPackage = response;
        this.versions = response.versions;
      }
    )
  }

  public onUpdatePackage(title: string, description: string, intro: string, processorType: string, ram: string, graphicsCard: string): void{
    const formData = this.packageService.createPackageFormDataUpdate(this.currentPackage.id, title, description, intro, processorType, ram, graphicsCard);

    this.packageService.updatePackage(formData).subscribe(
      (response: Package) => {
        this.sendNotification(NotificationType.SUCCESS, `Package: "${response.title}" updated successfully`)
        this.message = "The package was successfully updated!";
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.message = "Please add an unique title.";
      }
    )
  }

  public onAddNewVersion(newVersionNameInput: string, newVersionReadmeInput: string){
    this.packageService.addVersionToPackage(this.currentPackage.id, newVersionNameInput, newVersionReadmeInput).subscribe(
      (response: Package) => {
        this.sendNotification(NotificationType.SUCCESS, `Version updated successfully`)
        this.message = "The package was successfully updated!";
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.message = "Please add an unique title.";
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
