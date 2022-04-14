import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Version } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { Package } from 'src/app/model/package';

import { environment } from 'src/environments/environment';
import { Download } from '../model/download';
import { Review } from '../model/review';

@Injectable({
    providedIn: 'root'
})

export class DownloadService {
    private host = environment.apiUrl;

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    public addDownload(userId: number, packageId: number, versionName: string): Observable<Download> {
        return this.http.post<any>(`${this.host}/api/download/create`, {
            "userId": userId,
            "packageId": packageId,
            "versionName": versionName
        });
    }

    public getDownloadsOfUser(userId: number) {
        return this.http.get<Download[]>(`${this.host}/api/downloads/${userId}`, { observe: 'response' });
    }

    public wasVersionDownloadedBefore(formData: FormData): Observable<boolean> {
        return this.http.post<boolean>(`${this.host}/api/downloads/wasVersionDownloadedBefore`, formData);
    }

    public createWasVersionDownloadedBefore(userId: number, packageId: number, versionName: string) {
        const formData = new FormData();
        formData.append('userId', userId.toString());
        formData.append('packageId', packageId.toString());
        formData.append('versionName', versionName);
        return formData;

    }
}