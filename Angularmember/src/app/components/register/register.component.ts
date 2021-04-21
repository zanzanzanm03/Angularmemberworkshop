import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-z0-9]{6,15}$/)]],
      cpassword: ['', [Validators.required, this.comparePassword('password')]]
    });
  }

  // สร้าง validate เอง
  private comparePassword(passwordField: string) {
    return function (confirm_password: AbstractControl) {
      if (!confirm_password.parent) return;
      const password = confirm_password.parent.get(passwordField);
      const passwordSubscripe = password.valueChanges.subscribe(() => {
        confirm_password.updateValueAndValidity();
        passwordSubscripe.unsubscribe();
      });
      if (confirm_password.value === password.value)
        return;
      return { compare: true };
    }
  }
}
