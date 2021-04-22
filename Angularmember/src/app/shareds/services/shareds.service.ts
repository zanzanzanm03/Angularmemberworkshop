import { inject, Injectable } from "@angular/core";

@Injectable()
export class SharedsService {

    //  ตำแหน่งของสมาชิก
    positionItems: any[] = [
        'student1',
        'student2'
    ];

    // แปลงไฟล์รูปเป็น Base64
    onConvertImage(input: HTMLInputElement) {
        return new Promise((resolve, reject) => {
            const imageTypes = ['image/jpeg', 'image/png'];
            // หากไม่มีการ อัพโหลดภาพ
            if (input.files.length == 0)
                return resolve(null);
            // ตรวจสอบชนิดไฟล์ที่อัพโหลดเข้ามา
            if (imageTypes.indexOf(input.files[0].type) < 0) {
                return reject({ Message: 'กรุณาอัพโหลดรูปภาพเท่านั้น' });
            }
            const reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            // คืนค่า Image base64 ออกไป
            reader.addEventListener('load', () => resolve(reader.result));
        });
    }

}