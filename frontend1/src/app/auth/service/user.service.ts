import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.authService.loadToken()}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    return this.http.post<User>(`${this.host}/api/user/update`, requestOptions);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public resetPassword(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/api/user/update/password`, formData);
  }

  public becomeContentCreator(formData: FormData) {
    return this.http.post<User>(`${this.host}/api/user/add-role`, formData);
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public changeFirstTimeVar(userId: number): Observable<User> {
    return this.http.post<User>(`${this.host}/api/user/changeFirstTimeVar`, userId);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersToLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public createUserFormData(user: User): FormData {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('token', user.token);
    return formData;
  }

  public createUserFormDataUpdate(id: number, name: string, email: string): FormData {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', name);
    formData.append('email', email);
    return formData;
  }

  public createUserFormDataResetPassword(id: number, oldPassword: string, newPassword: string): FormData {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('oldpassword', oldPassword);
    formData.append('password', newPassword);
    return formData;
  }

  public createUserFormDataContentCreator(userId: number, roleName: string) {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('roleName', roleName);
    return formData;
  }

  public createChangeFirstTime(userId: number) {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    return formData;
  }

}
