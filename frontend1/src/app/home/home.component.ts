import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/service/authentication.service';
import { UserService } from '../auth/service/user.service';
import { User } from '../model/user';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService, public dialogRef: MatDialog, private userService: UserService, private router: Router) { }

  user: User;

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalCache();
    if(this.user != null) {
      if (this.checkIfUserIsNew() == true) {
        this.openTutorial();
      }
    }
  }

  checkIfUserIsNew(): boolean {
    if (this.user.firstTime == true) {
      //this.isFirstTime = true;
      this.changeFirstTimeVar();
      return true;
    }
    else {
      return false;
    }
  }

  openTutorial(): void {
    this.dialogRef.open(PopUpComponent, {
      height: '70%',
      width: '70%',
    });
  }

  changeFirstTimeVar() {
    this.userService.changeFirstTimeVar(this.authService.getUserFromLocalCache().id).subscribe( // we get user from the back-end
      (response: User) => {
        this.user = response;

        console.log(this.user);
        
        //change in local storage with the new user
        this.authService.removeUserFromLocalCache();
        this.authService.addUserToLocalCache(this.user);
      }
    )

  }

}
