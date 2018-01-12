import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';

//Ezek alapján vizsgálja meg a validitás ellenőrző, hogy az adott mezőbe e-mail írtunk-e.
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

@Component({
	selector: 'my-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

export class RegisterComponent{
	hidepass: boolean = true;
	hideconfpass: boolean = true;
	registerForm: FormGroup;
	constructor(private fb: FormBuilder){
			this.registerForm = fb.group({
				'registerName': [null, Validators.required],
				'registerEmail': [null, Validators.compose([Validators.required,
					Validators.pattern(EMAIL_REGEXP)])],
				'registerPassword': [null, Validators.compose([Validators.required,
					Validators.pattern(PASS_REGEX)])],
				'registerConfirmPassword': [null, Validators.required]
			},
			{validator: this.checkIfMatchingPasswords('registerPassword', 'registerConfirmPassword')}
		);
	}

	checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
		return (group: FormGroup) => {
			let passwordInput = group.controls[passwordKey],
			passwordConfirmationInput = group.controls[passwordConfirmationKey];
			if (passwordInput.value !== passwordConfirmationInput.value) {
				return passwordConfirmationInput.setErrors({notEquivalent: true})
			}
			else {
				return passwordConfirmationInput.setErrors(null);
			}
		}
	}
	
	onSubmit(): void{}
}