import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationType } from 'src/app/auth/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { NotificationService } from 'src/app/auth/service/notification.service';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { Download } from 'src/app/model/download';
import { Package } from 'src/app/model/package';
import { Review } from 'src/app/model/review';
import { User } from 'src/app/model/user';
import { PackageVersion } from 'src/app/model/version';
import { DownloadService } from 'src/app/_services/download-service';
import { PackageService } from 'src/app/_services/package-service/package-service';
import { ReviewService } from 'src/app/_services/review-service';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {
  public package: Package = null;
  public user: User = null;
  message: string = null;
  isPackageFavourite: boolean;
  versions: PackageVersion[];
  currentRate = 0;
  submitReviewMessage: string = null;
  packageReviews: Review[];
  nrReviews: number;
  averageRating: number;
  nrReviews1: number;
  nrReviews2: number;
  nrReviews3: number;
  nrReviews4: number;
  nrReviews5: number;
  barLengh1: number;
  barLengh2: number;
  barLengh3: number;
  barLengh4: number;
  barLengh5: number;
  ratingArr: number[];

  constructor(
    private packageService: PackageService,
    private router: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private reviewService: ReviewService,
    private downloadService: DownloadService) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    console.log(this.router.snapshot.params);
    this.getPackage();
    this.getReviewsOfPackage();
    this.getAverageRating();
  }

  public showIcon() {
    const stars = [];
    let j = 0;
    for (let i = 1; i <= this.averageRating; i++) {
      stars.push("fa fa-star checked yellow-color");
      j = i;
    }
    if (this.averageRating - j == 0.5) {
      stars.push("fas fa-star-half yellow-color");
    }
    return stars;
  }

  public getPackage(): void {
    this.packageService.getPackageById(this.router.snapshot.params.id).subscribe(
      (response: Package) => {
        this.package = response;
        this.isPackageInFavourites(this.user.id, this.package.id);
        this.versions = response.versions;
      }
    )
  }

  public getReviewsOfPackage(): void {
    this.reviewService.getReviewsOfPackage(this.router.snapshot.params.id).subscribe(
      (response: HttpResponse<Review[]>) => {
        this.packageReviews = response.body;
        this.nrReviews = this.packageReviews.length;
        console.log(response);

      }
    )
  }

  public getAverageRating(): void {
    this.reviewService.getAverageRatingOfPackage(this.router.snapshot.params.id).subscribe(
      (response: HttpResponse<number>) => {
        this.averageRating = response.body;
        this.nrReviews1 = this.getNrReviewsOfRating(1);
        this.nrReviews2 = this.getNrReviewsOfRating(2);
        this.nrReviews3 = this.getNrReviewsOfRating(3);
        this.nrReviews4 = this.getNrReviewsOfRating(4);
        this.nrReviews5 = this.getNrReviewsOfRating(5);
      }
    )
  }

  public getNrReviewsOfRating(rating: number): number {
    this.reviewService.getNrReviewsOfPackageRating(this.package.id, rating).subscribe(
      (response: HttpResponse<number>) => {
        if (rating == 1) {
          this.nrReviews1 = response.body
          this.barLengh1 = this.calculateReviewBarLenght(this.nrReviews1);
        }
        if (rating == 2) {
          this.nrReviews2 = response.body
          this.barLengh2 = this.calculateReviewBarLenght(this.nrReviews2);
        }
        if (rating == 3) {
          this.nrReviews3 = response.body
          this.barLengh3 = this.calculateReviewBarLenght(this.nrReviews3);
        }
        if (rating == 4) {
          this.nrReviews4 = response.body
          this.barLengh4 = this.calculateReviewBarLenght(this.nrReviews4);
        }
        if (rating == 5) {
          this.nrReviews5 = response.body
          this.barLengh5 = this.calculateReviewBarLenght(this.nrReviews5);
        }
        return response.body;
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.message = "An error occured while processing the request. Please try again.";
      }
    )
    return null;
  }


  public isPackageInFavourites(userId: number, packageId: number) {
    this.packageService.isPackageInFavourites(userId, packageId).subscribe(
      (response: Package) => {
        if (response != null) {
          this.isPackageFavourite = true;
        }
        else {
          this.isPackageFavourite = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.isPackageFavourite = false;
        console.log(this.isPackageFavourite);
      }
    )
  }

  public addPackageToFavourites(userId: number, packageId: number): void {
    const formData = this.packageService.createAddFavouritePackageFormData(userId, packageId);

    this.packageService.addPackageToFavourites(formData).subscribe(
      (response: Package) => {
        this.sendNotification(NotificationType.SUCCESS, `Package: "${response.title}" added to favourites successfully`)
        this.message = "Package added to favourites!";
        this.isPackageFavourite = true;
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.message = "Package not added to favourites!"
      }
    )
  }

  public removePackageFromFavourites(userId: number, packageId: number): void {
    this.packageService.removePackageFromFavourites(userId, packageId).subscribe(
      (response: CustomHttpResponse) => {
        this.message = "Package removed from favourites!";
        this.isPackageFavourite = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.message = "Package not removed from favourites!"
      }
    )
  }

  public submitRating() {
    if (this.currentRate !== 0) {
      this.reviewService.addReviewToPackage(this.authenticationService.getUserFromLocalCache().id, this.package.id, this.currentRate).subscribe(
        (response: Review) => {
          this.sendNotification(NotificationType.SUCCESS, `Reviews added succesfully`);
          this.submitReviewMessage = "The review was successfully added!"
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error);
          this.submitReviewMessage = errorResponse.message;
        }
      )
    }
  }

  showOverview() {
    let packageInfo = document.getElementById("package-info-description")
    if (packageInfo !== null) {
      packageInfo.innerHTML = this.package.description;
    }
    let title = document.getElementById("package-info-title");
    if (title !== null) {
      title.innerHTML = "Overview";
    }
  }

  showSystemRequirements() {
    let packageInfo = document.getElementById("package-info-description")
    if (packageInfo !== null) {
      packageInfo.innerHTML = `Processor Type: ${this.package.systemRequirements.processorType} <br> 
      RAM: ${this.package.systemRequirements.ram} <br> Graphics Card: ${this.package.systemRequirements.graphicsCard}`;
    }
    let title = document.getElementById("package-info-title");
    if (title !== null) {
      title.innerHTML = "System Requirements";
    }
  }

  showRelated() {
    let packageInfo = document.getElementById("package-info-description")
    if (packageInfo !== null) {
      packageInfo.innerHTML = "Related: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim idest laborum.";
    }
    let title = document.getElementById("package-info-title");
    if (title !== null) {
      title.innerHTML = "Related";
    }
  }

  public downloadVersion(versionName: string, readme: string) {
    let zip = new JSZip();
    zip.file('README.txt', readme);
    zip.generateAsync({ type: "blob" }).then((content) => {
      FileSaver.saveAs(content, `${this.package.title} ${versionName}.zip`);
    });
    this.downloadService.addDownload(this.authenticationService.getUserFromLocalCache().id, this.package.id, versionName).subscribe(
      (response: Download) => {
        this.sendNotification(NotificationType.SUCCESS, `Downloaded succesfully`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error);
      }
    )

  }

  private calculateReviewBarLenght(reviews: number) {
    if (this.nrReviews !== 0) {
      let value = 100 / this.nrReviews;
      return ((value * reviews));
    }
    return 0;
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
