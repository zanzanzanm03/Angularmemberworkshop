import { FormGroup } from '@angular/forms';

export interface IRegisterComponent {
    form: FormGroup;
    Url: any;

    onSubmit();
}
