import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';
//Ezek alapján vizsgálja meg a validitás ellenőrző, hogy az adott mezőbe e-mail írtunk-e.
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
	selector: 'my-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent{
	resetPassForm: FormGroup;
	constructor(private fb: FormBuilder){
		this.resetPassForm = fb.group({
			'resetPassEmail': [null, Validators.compose([Validators.required,
				Validators.pattern(EMAIL_REGEXP)])]
		});
	}
	
	onSubmit(): void{}
}