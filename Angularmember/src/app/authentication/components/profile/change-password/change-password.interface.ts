import { FormControlName, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

export interface IChangePasswordComponent {
    modalRef: BsModalRef;
    form: FormGroup;

    onSubmit();
}