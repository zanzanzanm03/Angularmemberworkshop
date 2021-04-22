import { FormGroup } from "@angular/forms";
import { IRoleAccount } from "src/app/shareds/services/account.service";

export interface IMemberCreateComponent {
    positionItems: String[];
    memId: any;
    roleItems: IRoleAccount[];
    form: FormGroup;

    onSubmit(): void;
    getRoleName(role: IRoleAccount): String;
    onConvertImage(input: HTMLInputElement);
}