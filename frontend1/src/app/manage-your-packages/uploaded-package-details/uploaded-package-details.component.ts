import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { Package } from 'src/app/model/package';
import { PackageService } from 'src/app/_services/package-service/package-service';

@Component({
  selector: 'app-uploaded-package-details',
  templateUrl: './uploaded-package-details.component.html',
  styleUrls: ['./uploaded-package-details.component.css']
})
export class UploadedPackageDetailsComponent implements OnInit {
  package: Package = null;

  constructor(private packageService: PackageService, private router: ActivatedRoute, private router1: Router) { 
   }

  ngOnInit(): void {
    console.log(this.router.snapshot.params);
    this.getPackage();
    
  }

  public getPackage(): void {
    this.packageService.getPackageById(this.router.snapshot.params.id).subscribe(
      (response: Package) => {
        this.package = response;   
        console.log(this.package);
             
      }
    )
  }

  public deletePackage(packageId: number): void {
      this.packageService.deletePackage(packageId).subscribe(
        (response: CustomHttpResponse) => {
          this.router1.navigate(["manage-packages"]);
        },
      )
  }

}
