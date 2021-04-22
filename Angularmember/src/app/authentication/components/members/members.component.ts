import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AuthURL } from '../../authentication.url';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMemberSearch, IMemberSearchKey } from './members.interface';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
  constructor(
    private member: MemberService,
    private alert: AlertService,
    private router: Router
  ) {
    this.initialLoadMembers();
    // กำหนดค่าเริ่มให้กับ searchType
    this.serachType = this.searchTypeItems[0];
  }


  items: IAccount[] = [];

  // ตัวแปรสำหรับค้นหา
  searchText: string = '';
  serachType: IMemberSearchKey;
  searchTypeItems: IMemberSearchKey[] = [
    { key: 'email', value: 'ค้นหาจากอีเมล์' },
    { key: 'firstname', value: 'ค้นหาจากชื่อ' },
    { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
    { key: 'position', value: 'ค้นหาจากตำแหน่ง' },
    { key: 'role', value: 'ค้นหาจากสิทธิ์ผู้ใช้' }
  ];

  // ค้นหาข้อมูล
  onSearchItem() {
    this.initialLoadMembers({
      searchText: this.serachType.key == 'role' ? IRoleAccount[this.searchText] || '' : this.searchText,
      searchType: this.serachType.key
    });
  }

  // แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  // ลบข้อมูลสมาชิก
  onDeleteMember(item: IAccount) {
    this.alert.confirm().then(status => {
      if (!status) return;
      this.member
        .deleteMember(item.id)
        .then(() => {
          // โหลดข้อมูล Member ใหม่
          this.initialLoadMembers({
            searchText: this.getSearchText,
            searchType: this.serachType.key,

          });
          this.alert.notify('ลบข้อมูลสำเร็จ', 'info');
        })
        .catch(err => this.alert.notify(err.Message));
    });
  }

  // แก้ไขข้อมูลสมาชิกโดยส่ง id ไปยัง url
  onUpdateMember(item: IAccount) {
    this.router.navigate(['',
      AppURL.Authen,
      AuthURL.MemberCreate,
      item.id
    ]);
  }

  // ตรวจสอบและ return ค่า searchText
  private get getSearchText() {
    return this.serachType.key == 'role' ? IRoleAccount[this.searchText] || '' : this.searchText;
  }


  // โหลดข้อมูลสมาชิก
  private initialLoadMembers(options?: IMemberSearch) {
    this.member
      .getMembers(options)
      .then(items => this.items = items)
      .catch(err => this.alert.notify(err.Message));
  }

}
