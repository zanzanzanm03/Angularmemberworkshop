import { IAccount, IRoleAccount } from '../../../shareds/services/account.service';

export interface IMembersComponent {
    items: IAccount[];

    // ส่วนของการค้นหา
    searchText: string;
    serachType: IMemberSearchKey;
    searchTypeItems: IMemberSearchKey[];
    onSearchItem(): void;

    getRoleName(role: IRoleAccount): string;
    onDeleteMember(item: IAccount): void;
}

export interface IMemberSearch {
    searchText: string;
    searchType: string;
}

export interface IMemberSearchKey {
    key: string;
    value: string;
}