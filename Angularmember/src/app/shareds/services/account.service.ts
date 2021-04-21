import { Injectable } from '@angular/core';
import { ILogin } from 'src/app/components/login/login.interface';
import { IRegister } from '../../components/register/register.interface';
@Injectable()
export class AccountService {

    mockUserItems: IAccount[] = [
        {
            id: 1,
            firstname: 'ณธกร',
            lastname: 'จิระอรรคพงษ์',
            email: 'nathakorn@hotmail.com',
            password: '0836169882',
            position: 'Student',
            image: 'https://scontent.furt2-1.fna.fbcdn.net/v/t1.6435-9/115745071_3000438766749237_4464221486658742349_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeElR1h_kM3OnmAHSWehyHJhekPcaDnzzNh6Q9xoOfPM2NLl8VetQu18SGFby8jNV65NPHYIsAMU1P1GGXVl-QpT&_nc_ohc=BZgg2ywXqi8AX97FjKH&_nc_ht=scontent.furt2-1.fna&oh=420bc65cd6cb0b8efee0eb1e1d465c16&oe=60A66AFD',
            created: new Date(),
            updated: new Date()
        }
    ];

    // เข้าสู่ระบบ
    onLogin(model: ILogin) {
        return new Promise<{ accessToken: string }>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password);
            if (!userLogin) return reject({ Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
            resolve({
                accessToken: userLogin.id
            });
        });
    }

    // ลงทะเบียน
    onRegister(model: IRegister) {
        return new Promise((resolve, reject) => {
            model['id'] = Math.random();
            this.mockUserItems.push(model);
            resolve(model);
        });
    }

}

export interface IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    created?: Date;
    updated?: Date;
}