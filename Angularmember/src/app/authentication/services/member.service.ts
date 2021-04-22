import { Injectable } from "@angular/core";
import { AccountService, IAccount } from '../../shareds/services/account.service';
import { IMemberSearch } from "../components/members/members.interface";

@Injectable()
export class MemberService {
    constructor(private account: AccountService) { }

    // ดึงข้อมูลสมาชิกทังหมด
    getMembers(options?: IMemberSearch) {
        return new Promise<IAccount[]>((resolve, reject) => {
            // เรียงลำดับข้อมูลใหม่จาก วันที่แก้ไขล่าสุด
            let items = this.account.mockUserItems.sort((a1, a2) => {
                return Date.parse(a2.updated.toString()) - Date.parse(a1.updated.toString());
            });

            // หากมีการค้นหาข้อมูล
            if (options && options.searchText && options.searchType) {
                // ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
                items = this.account
                    .mockUserItems
                    .filter(item =>
                        item[options.searchType].toString().toLowerCase()
                            .indexOf(options.searchText.toString().toLowerCase()) >= 0
                    );
            }
            resolve(items);
        });
    }

    // ดึงข้อมูลสมาชิกคนเดียว
    getMemberById(id) {
        return new Promise<IAccount>((resolve, reject) => {
            const member = this.account.mockUserItems.find(item => item.id == id);
            if (!member) return reject({ Message: 'ไม่มีข้อมูลสมาชิกในระบบ' });
            resolve(member);
        });
    }

    // เพิ่มข้อมูลสมาชิก
    createMemeber(model: IAccount) {
        return new Promise((resolve, reject) => {
            if (this.account.mockUserItems.find(item => item.email == model.email))
                return reject({ Message: 'อีเมล์นี้มีในระบบแล้ว' });
            model.id = Math.random();
            model.created = new Date();
            model.updated = new Date();
            this.account.mockUserItems.push(model);
            resolve(model);
        });
    }

    // ลบข้อมูลสมาชิก
    deleteMember(id: any) {
        return new Promise((resolve, reject) => {
            const findIndex = this.account.mockUserItems.findIndex(item => item.id == id);
            if (findIndex < 0) return reject({ Message: 'ไม่มีข้อมูลนี้ในระบบ' });
            resolve(this.account.mockUserItems.splice(findIndex, 1));
        });
    }
}