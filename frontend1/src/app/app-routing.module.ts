import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './auth/guard/authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddPackageComponent } from './manage-your-packages/add-package/add-package.component';
import { ManageYourPackagesComponent } from './manage-your-packages/manage-your-packages.component';
import { UpdatePackageCreatorComponent } from './manage-your-packages/update-package-creator/update-package-creator.component';
import { UploadedPackageDetailsComponent } from './manage-your-packages/uploaded-package-details/uploaded-package-details.component';
import { Role } from './model/role';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ResetPasswordProfileComponent } from './profile-page/reset-password-profile/reset-password-profile.component';
import { UpdateProfileInfoComponent } from './profile-page/update-profile-info/update-profile-info.component';
import { RegistrationComponent } from './registration/registration.component';
import { PackageDetailsComponent } from './store/package-details/package-details.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'store',
    children: [
      {
        path: '', component: StoreComponent
      },
      {
        path: 'package',
        children: [
          { path: 'details/:id', component: PackageDetailsComponent }
        ]
      }]
  },
  {
    path: 'profile-page',
    children: [
      {
        path: '', component: ProfilePageComponent
      },
      {
        path: 'update-profile', component: UpdateProfileInfoComponent
      },
      {
        path: 'reset-password', component: ResetPasswordProfileComponent
      },]
  },
  {
    path: 'manage-packages',
    // canActivate: [AuthenticationGuard],
    data: {
      role: "ROLE_CONTENT_CREATOR"
    },
    children: [
      {
        path: '', component: ManageYourPackagesComponent
      },
      {
        path: 'add-package', component: AddPackageComponent
      },
      {
        path: 'details/:id/update-package/:id', component: UpdatePackageCreatorComponent
      },
      {
        path: 'details/:id', component: UploadedPackageDetailsComponent
      },
      // {
      //   path: 'package',
      //   children: [
      //     { path: 'details/:id', component: UploadedPackageDetailsComponent },
      //     { path: 'update/:id', component: UpdatePackageCreatorComponent }
      //   ]
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
