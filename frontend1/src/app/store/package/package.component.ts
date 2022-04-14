import { Component, Input, OnInit } from '@angular/core';
import { Package } from 'src/app/model/package';
import { PackageService } from 'src/app/_services/package-service/package-service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  @Input() public title: String;
  @Input() public id: number;
  @Input() public intro: String;
  package: Package;

  constructor(private packageService: PackageService) { }

  ngOnInit(): void {

  }

  // this.subscriptions.push(
  //   this.userService.getUsers().subscribe(
  //     (response: User[]) => {
  //       this.userService.addUsersToLocalCache(response);
  //       this.users = response;
  //       this.refreshing = false;
  //       if (this.sendNotification) {
  //         this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
  //       }
  //     },
  //     (errorResponse: HttpErrorResponse) => {
  //       this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
  //       this.refreshing = false;
  //     }
  //   )
  // );

}
