import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
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
    private router: Router
  ) {
    this.initialCreateFormData();
  }




  Url = AppURL;
  form: FormGroup;

  // เข้าสุ่ระบบ
  onSubmit(): void {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    this.router.navigate(['/', AppURL.Authen, AuthURL.Dashboard]);
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
