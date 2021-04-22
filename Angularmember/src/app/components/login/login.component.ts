import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ILoginComponent } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService,
    private activateRoute: ActivatedRoute
  ) {
    // เก็บค่า return url เพื่อไปหน้าที่เข้าไว้หลังจาก login
    this.activateRoute.params.forEach(params => {
      this.returnURL = params.returnURL || `/${AppURL.Authen}/${AuthURL.Dashboard}`;
    });
    this.initialCreateFormData();
  }




  Url = AppURL;
  returnURL: string;
  form: FormGroup;

  // เข้าสุ่ระบบ
  onSubmit(): void {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    this.account
      .onLogin(this.form.value)
      .then(res => {
        // เก็บ session
        this.authen.setAuthenticated(res.accessToken);
        // alert และ redirect หน้า page
        this.alert.notify('เข้าสู่ระบบสำเร็จ', 'info');
        this.router.navigateByUrl(this.returnURL);
      })
      .catch(err => this.alert.notify(err.Message));
  }

  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [true]
    });
  }
}
