import { Injectable } from "@angular/core";
import { AccountService, IAccount } from '../../shareds/services/account.service';

@Injectable()
export class MemberService {
    constructor(private account: AccountService) { }

    // ดึงข้อมูลสมาชิกทังหมด
    getMembers() {
        return new Promise<IAccount[]>((resolve, reject) => {
            resolve(this.account.mockUserItems);
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
}