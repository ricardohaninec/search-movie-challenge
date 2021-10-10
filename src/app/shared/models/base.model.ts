import { FormGroup, FormControl } from '@angular/forms';

export abstract class BaseModel {

    public _id: string;

    constructor(data?: any) {
        if (data) {
            this._id = data._id;
        }
    }

    public toFormGroup(): FormGroup {
        return new FormGroup ({
            _id: new FormControl(0)
        });
    }
}
