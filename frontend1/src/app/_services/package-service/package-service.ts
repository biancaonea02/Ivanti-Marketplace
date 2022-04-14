import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Version } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { UserService } from 'src/app/auth/service/user.service';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { Package } from 'src/app/model/package';
import { SystemRequirements } from 'src/app/model/systemRequirements';
import { PackageVersion } from 'src/app/model/version';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PackageService {
    private host = environment.apiUrl;

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    public getPackages(): Observable<HttpResponse<Package[]>> {
        return this.http.get<Package[]>(`${this.host}/api/packages`, { observe: 'response' });
    }

    public getFirst3Packages(): Observable<HttpResponse<Package[]>> {
        return this.http.get<Package[]>(`${this.host}/api/packages/first3packages`, { observe: 'response' });
    }

    //   public addPackage(formData: FormData): Observable<Package | HttpErrorResponse> {
    //     return this.http.post<Package>(`${this.host}/user/add`, formData);
    //   }

    public addPackagesToLocalCache(packages: Package[]): void {
        localStorage.setItem('packages', JSON.stringify(packages));
    }

    public getPackageById(packageId: number): Observable<Package> {
        return this.http.get<Package>(`${this.host}/api/packages/get/${packageId}`);
    }

    public getFavouritePackagesOfUser(userId: number): Observable<Package[]>
    {
        return this.http.get<Package[]>(`${this.host}/api/packages/favouriteOfUser/${userId}`);
    }

    public getDownloadedPackagesOfUser(userId: number): Observable<Package[]>
    {
        return this.http.get<Package[]>(`${this.host}/api/packages/downloaded/${userId}`);
    }

    // public addPackageToLocalCache(selectedPackage: Package): void {
    //     localStorage.setItem('package', JSON.stringify(selectedPackage));
    // }

    public getPackageFromLocalCache(): Package {
        if (localStorage.getItem('package')) {
            return JSON.parse(localStorage.getItem('package'));
        }
        return null;
    }

    public createPackageFormDataUpdate(id: number, title: string, description: string, intro: string, processorType: string, ram: string, graphicsCard: string): FormData {
        const formData = new FormData();
        formData.append('id', id.toString());
        formData.append('title', title);
        formData.append('description', description);
        formData.append('intro', intro);
        formData.append('processorType', processorType);
        formData.append('ram', ram);
        formData.append('graphicsCard', graphicsCard);
        return formData;
    }

    public createAddFavouritePackageFormData(userId: number, packageId: number): FormData {
        const formData = new FormData();
        formData.append('userId', userId.toString());
        formData.append('packageId', packageId.toString());
        return formData;
    }

    public addPackageToFavourites(formData: FormData): Observable<Package> {
        return this.http.post<Package>(`${this.host}/api/packages/favourites/add`, formData);
    }

    public removePackageFromFavourites(userId: number, packageId: number): Observable<CustomHttpResponse> {
        const params = new HttpParams().set('userId', userId).set('packageId', packageId);
        return this.http.delete<CustomHttpResponse>(`${this.host}/api/packages/favourites/remove`, {params});
    }
    
    public isPackageInFavourites(userId: number, packageId: number) {
        const params = new HttpParams().set('userId', userId).set('packageId', packageId);
        return this.http.get<Package>(`${this.host}/api/packages/favourites/check`, { params });
    }

    public updatePackage(formData: FormData): Observable<Package> {
        return this.http.post<Package>(`${this.host}/api/packages/update-package`, formData);
    }

    // public addPackage(formData: FormData): Observable<Package> {
    //     return this.http.post<Package>(`${this.host}/api/packages/create`, formData);
    // }

    // public createPackageFormData(newPackage: Package, newSystemRequirements: SystemRequirements, newVersion: PackageVersion): FormData {
    //     const formData = new FormData();
    //     formData.append('title', newPackage.title);
    //     formData.append('creator', JSON.stringify(this.authService.getUserFromLocalCache()));
    //     formData.append('intro', newPackage.intro);
    //     formData.append('processorType', newSystemRequirements.processorType);
    //     formData.append('ram', newSystemRequirements.ram);
    //     formData.append('graphicsCard', newSystemRequirements.graphicsCard);
    //     formData.append('name', newVersion.name);
    //     formData.append('readme', newVersion.readme);
    //     formData.append('url', newVersion.url);
    //     // formData.append('file', file);
    //     return formData;
    // }

    // public createNewPackageFormData(newPackage: Package, newVersion: PackageVersion, newSystemRequirements: SystemRequirements, file: File): FormData {
    //     var formdata = new FormData();
    //     formdata.append("rawPackage", `{\n    \"title\": \`${newPackage.title}\`,\n    \"creatorId\": \`${this.authService.getUserFromLocalCache().id}\`,\n    \"intro\": \"this is overview text of the package\"\n}`);
    //     formdata.append("rawVersion", `{\n    \"name\" : \`${newVersion.name}\`,\n    \"readme\" : \`${newVersion.readme}\`\n}`);
    //     formdata.append("file", file);
    //     formdata.append("rawRequirements", `{\n \"processorType\":\`${newSystemRequirements.processorType}\`,\n \"ram\":\`${newSystemRequirements.ram}\`,\n \"graphicsCard\":\`${newSystemRequirements.graphicsCard}\`\n}`);
    //     return formdata;
    // }

    public createNewPackage(title: string, description:string, intro: string, versionName: string, versionReadMe: string, processorType: string, ram: string, graphicsCard: string): Observable<Package> {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.authService.loadToken()}`);
        myHeaders.append("Content-Type", "application/json");

        return this.http.post<any>(`${this.host}/api/packages/add-new-package`, {
            "title": title,
            "description": description,
            "creator": {
                "id": this.authService.getUserFromLocalCache().id,
                "name": this.authService.getUserFromLocalCache().name,
                "username": this.authService.getUserFromLocalCache().username,
                "email": this.authService.getUserFromLocalCache().email
            },
            "intro": intro,
            "systemRequirements": {
                "processorType": processorType,
                "ram": ram,
                "graphicsCard": graphicsCard
            }
        });
    }

    public deletePackage(packageId: number): Observable<CustomHttpResponse> {
        return this.http.delete<CustomHttpResponse>(`${this.host}/api/packages/delete/${packageId}`);
    }

    public addVersionToPackage(idPackage: number, versionName: string, versionReadMe: string): Observable<Package> {
        return this.http.post<Package>(`${this.host}/api/packages/add-version/${idPackage}`, { "name": versionName, "readme": versionReadMe });
    }

    public getUploadedPackagesOfUser(idUser: number) {
        return this.http.get<Package[]>(`${this.host}/api/packages/uploaded/${idUser}`, { observe: 'response' });
    }
    //TO DO: if the user is a content creator, when he updates the profile info, the creator info should also be updated
}