import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DealsComponent } from './home/deals/deals.component';
import { IntroComponent } from './home/intro/intro.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact/contact.component';
import { AboutComponent } from './home/about/about.component';
import { StoreComponent } from './store/store.component';
import { PackageComponent } from './store/package/package.component';
import { PackageDetailsComponent } from './store/package-details/package-details.component';
import { StoreIntroComponent } from './store/store-intro/store-intro.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './auth/service/notification.service';
import { AuthenticationGuard } from './auth/guard/authentication.guard';
import { AuthenticationService } from './auth/service/authentication.service';
import { UserService } from './auth/service/user.service';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { NotificationModule } from './notification.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UpdateProfileInfoComponent } from './profile-page/update-profile-info/update-profile-info.component';
import { ResetPasswordProfileComponent } from './profile-page/reset-password-profile/reset-password-profile.component';
import { FooterComponent } from './footer/footer.component';
import { ManageYourPackagesComponent } from './manage-your-packages/manage-your-packages.component';
import { AddPackageComponent } from './manage-your-packages/add-package/add-package.component';
import { UploadedPackagesCardComponent } from './manage-your-packages/uploaded-packages-card/uploaded-packages-card.component';
import { UploadedPackagesComponent } from './manage-your-packages/uploaded-packages/uploaded-packages.component';
import { UploadedPackageDetailsComponent } from './manage-your-packages/uploaded-package-details/uploaded-package-details.component';
import { UpdatePackageCreatorComponent } from './manage-your-packages/update-package-creator/update-package-creator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NextDirective } from './directives/next.directive';
import { PopUpComponent } from './pop-up/pop-up.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DealsComponent,
    IntroComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    StoreComponent,
    PackageComponent,
    PackageDetailsComponent,
    StoreIntroComponent,
    LoginComponent,
    RegistrationComponent,
    ProfilePageComponent,
    UpdateProfileInfoComponent,
    ResetPasswordProfileComponent,
    FooterComponent,
    ManageYourPackagesComponent,
    AddPackageComponent,
    UploadedPackagesCardComponent,
    UploadedPackagesComponent,
    UploadedPackageDetailsComponent,
    UpdatePackageCreatorComponent,
    NextDirective,
    PopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [NotificationService, AuthenticationGuard, AuthenticationService, UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})

export class AppModule { }
