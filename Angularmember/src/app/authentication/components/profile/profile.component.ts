import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { IProfileComponent } from './profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  constructor(
    private buider: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService
  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
  }

  form: FormGroup;
  positionItems: any[] = [
    'student1',
    'student2'
  ];

  // บันทึกข้อมูล
  onSubmit() {
    console.log(this.form.value);
  }

  // สร้างฟอร์ม 
  private initialCreateFormData() {
    this.form = this.buider.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      position: [''],
      image: [null]
    });
    // disabled อีเมล์
    this.form.get('email').disable();
  }

  // โหลดข้อมูลใหม่พร้อมกับ Update form data
  private initialLoadUpdateFormData() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.form.controls['email'].setValue(user.email);
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);
      })
      .catch(err => this.alert.notify(err.Message));
  }
}
