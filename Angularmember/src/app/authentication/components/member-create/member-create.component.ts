import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IRoleAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { IMemberCreateComponent } from './member-create.interface';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements IMemberCreateComponent {

  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder,
    private alert: AlertService

  ) {
    this.initialCreateFormData();
    // เพิ่ม position
    this.positionItems = this.shareds.positionItems;
  }


  form: FormGroup;
  positionItems: String[];
  roleItems: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Users,
    IRoleAccount.Admin

  ];

  // บันทึกหรือแก้ไขข้อมูล
  onSubmit(): void {
    console.log(this.form.value);
  }

  // แสดงข้อมูลสิทธิ์ผู้ใช้เป็นตัวหนังสือ
  getRoleName(role: IRoleAccount): String {
    return IRoleAccount[role];
  }

  // แสดงตัวอย่างภาพอัพโหลด
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    this.shareds
      .onConvertImage(input)
      .then(base64 => imageControl.setValue(base64))
      .catch(err => this.alert.notify(err.Message));
  }


  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      image: [],
      email: [],
      password: [],
      firstname: [],
      lastname: [],
      position: [''],
      role: ['']
    });
  }



}
