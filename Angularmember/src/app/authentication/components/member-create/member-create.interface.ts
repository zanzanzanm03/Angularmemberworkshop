import { IRoleAccount } from "src/app/shareds/services/account.service";

export interface IMemberCreateComponent {
    positionItems: String[];
    roleItems: IRoleAccount[];

    getRoleName(role: IRoleAccount): String;
}