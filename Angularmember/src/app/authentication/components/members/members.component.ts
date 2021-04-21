import { Component, OnInit } from '@angular/core';
import { IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { MemberService } from '../../services/member.service';
import { IMembersComponent } from './members.interface';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
  constructor(
    private member: MemberService,
    private alert: AlertService
  ) {
    this.initialLoadMembers();
  }

  items: IAccount[] = [];

  // แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  // โหลดข้อมูลสมาชิก
  private initialLoadMembers() {
    this.member
      .getMembers()
      .then(items => {
        this.items = items;
      })
      .catch(err => this.alert.notify(err.Message));
  }

}
