import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { newUser } from 'src/app/model/newUser';
interface FormData { getAll(): string[] }




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = environment.apiUrl;
  private token !: string;
  private loggedInUsername !: string;
  currentUser!: User;
  currentToken !: string; //becasue of this Angular version its impossible to return the exact token string, so we need a transitional object
  private jwtHelper = new JwtHelperService();

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<HttpResponse<any>> {

    // console.log(username);
    // console.log(password);
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    this.addBodyToLocalCache(body);
    localStorage.setItem('username', username);
    return this.http.post<HttpResponse<any>>(`${this.host}/api/login`, body, { observe: 'response' });
  }

  public register(name: string, username: string, password: string, email: string): Observable<User> {
    let body = new HttpParams();
    body = body.set('name', name);
    body = body.set('username', username);
    body = body.set('password', password);
    body = body.set('email', email);

    var userDTO = new newUser /*(name, username, email, -1, password)*/;

    userDTO.name = name;
    userDTO.username = username;
    userDTO.email = email;
    userDTO.password = password;
    userDTO.role = "-1";
    return this.http.post<any>(`${this.host}/api/register`, userDTO);
  }

  public logOut(): void {
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    //localStorage.removeItem('token');
    // localStorage.removeItem('users');
  }

  public removeUserFromLocalCache(): void{
    localStorage.removeItem('user');
  }

  public addUserToLocalCache(user?: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public addBodyToLocalCache(body?: HttpParams): void {
    localStorage.setItem('user', JSON.stringify(body));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadToken(): string {
    const tokenJson = localStorage.getItem('token');
    this.currentToken = tokenJson !== null ? JSON.parse(tokenJson) : new User();
    return this.currentToken;
    // this.token = this.currentUser.token
    // return this.token;

  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          //this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub; // not correct 
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }

  public isUserContentCreator(): boolean {
    for (const role of this.getUserFromLocalCache().roles) {
      if (role.name === "ROLE_CONTENT_CREATOR")
      {
        return true;
      }
    }
    return false;
  }
}

