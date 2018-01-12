import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';

export abstract class BaseEditComponent{
	constructor(protected location: Location,){}

	protected abstract initform(): void;

	goBack(): void {
		this.location.back();
	}

	protected abstract save(): void;

	protected abstract add(item: any): void;

	//Úgy állítja a form iput mezőit, mintha belekattintottunk volna
	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			}
			else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	protected abstract onSubmit(item: any): void;
}