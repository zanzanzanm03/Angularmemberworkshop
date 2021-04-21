import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { AccountService, IAccount } from '../../services/account.service';
import { AlertService } from '../../services/alert.service';
import { IAuthSidebarComponent } from './auth.sidebar.interface';

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {
  constructor(
    private acccount: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router

  ) {
    this.initialLoadUserLogin();
  }


  ngOnInit() {
  }

  AppURL = AppURL;
  AuthURL = AuthURL;
  UserLogin: IAccount;

  // โหลดข้อมูล User ที่เข้าสู่ระบบ จาก Token
  private initialLoadUserLogin() {
    this.acccount
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => this.UserLogin = userLogin)
      .catch(err => {
        this.alert.notify(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      });
  }

}

