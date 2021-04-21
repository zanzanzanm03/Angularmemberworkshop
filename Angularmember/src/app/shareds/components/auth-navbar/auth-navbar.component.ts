import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authen: AuthenService,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  AppURL = AppURL;
  AuthURL = AuthURL;

  // การออกจากระบบ
  onLogout() {
    this.alert.notify('ออกจากระบบเรียบร้อย', 'Info');
    this.authen.clearAuthenticated();
    this.router.navigate(['/', AppURL.Login]);

  }
}
