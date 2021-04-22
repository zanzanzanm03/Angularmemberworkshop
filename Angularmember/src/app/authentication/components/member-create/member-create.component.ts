import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { IRoleAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';
import { AuthURL } from '../../authentication.url';
import { MemberService } from '../../services/member.service';
import { IMemberCreateComponent } from './member-create.interface';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers: [MemberService]
})
export class MemberCreateComponent implements IMemberCreateComponent {

  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private validators: ValidatorsService,
    private member: MemberService,
    private router: Router,
    private activatedRouter: ActivatedRoute

  ) {

    this.activatedRouter.params.forEach(params => {
      console.log(params);
    });

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
    if (this.form.invalid)
      return this.alert.someting_wrong();
    this.member
      .createMemeber(this.form.value)
      .then(res => {
        this.alert.notify('บันทึกข้อมูลสำเร็จ', 'info');
        this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
      })
      .catch(err => this.alert.notify(err.Message));
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
      .catch(err => {
        input.value = null;
        imageControl.setValue(null);
        this.alert.notify(err.Message);
      });
  }



  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      image: [],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validators.isPassword]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      position: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }



}
