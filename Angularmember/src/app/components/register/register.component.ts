import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
declare let $;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService
  ) {
    this.initialCreateFormData();
  }

  Url = AppURL;
  form: FormGroup;

  // ลงทะเบียน
  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    console.log(this.form.value);
  }

  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]]
    });
  }

  // สร้าง validate เอง
}
