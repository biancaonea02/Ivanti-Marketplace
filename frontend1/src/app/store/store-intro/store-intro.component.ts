import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/model/package';
import { PackageService } from 'src/app/_services/package-service/package-service';

@Component({
  selector: 'app-store-intro',
  templateUrl: './store-intro.component.html',
  styleUrls: ['./store-intro.component.css']
})
export class StoreIntroComponent implements OnInit {

  public packages: Package[];

  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.getFirst3Packages();
  }

  public getFirst3Packages() {
    this.packageService.getFirst3Packages().subscribe( // we get user from the back-end
      (response: HttpResponse<Package[]>) => {
        this.packages = response.body;
        console.log(this.packages);
        
      }
    )
  }

}
