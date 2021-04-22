import { Component, OnInit } from '@angular/core';
import { IRoleAccount } from 'src/app/shareds/services/account.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { IMemberCreateComponent } from './member-create.interface';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements IMemberCreateComponent {

  constructor(
    private shareds: SharedsService
  ) {
    // เพิ่ม position
    this.positionItems = this.shareds.positionItems;
  }




  positionItems: String[];
  roleItems: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Users,
    IRoleAccount.Admin

  ];

  // แสดงข้อมูลสิทธิ์ผู้ใช้เป็นตัวหนังสือ
  getRoleName(role: IRoleAccount): String {
    return IRoleAccount[role];
  }



}
