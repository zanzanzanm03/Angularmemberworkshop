import { FormGroup } from '@angular/forms';

export interface IProfileComponent {
    positionItems: any[];
    form: FormGroup;
    onSubmit(): void;
}