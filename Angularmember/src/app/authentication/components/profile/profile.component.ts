import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
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
    private alert: AlertService,
    private modalService: BsModalService
  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
  }

  form: FormGroup;
  modalRef: BsModalRef;
  positionItems: any[] = [
    'student1',
    'student2'
  ];

  // บันทึกข้อมูล
  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.account
      .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
      .then(() => this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info'))
      .catch(err => this.alert.notify(err.Message));
  }

  // แปลงไฟล์รูปเป็น Base64
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    const imageTypes = ['image/jpeg', 'image/png'];

    imageControl.setValue(null);
    if (input.files.length == 0) return;
    // ตรวจสอบชนิดไฟล์ที่อัพโหลดเข้ามา
    if (imageTypes.indexOf(input.files[0].type) < 0) {
      input.value = null;
      return this.alert.notify('กรุณาอัพโหลดรูปภาพเท่านั้น');
    }

    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', () => {
      imageControl.setValue(reader.result);
    });
  }

  // เปิด Modal dialog
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // สร้างฟอร์ม 
  private initialCreateFormData() {
    this.form = this.buider.group({
      email: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
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
