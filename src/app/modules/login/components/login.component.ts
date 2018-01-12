import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
	selector: 'my-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent{
	hide: boolean = true;
	loginForm: FormGroup;
	constructor(private fb: FormBuilder){
		this.loginForm = fb.group({
			'loginEmail': [null, Validators.compose([Validators.required,
				Validators.pattern(EMAIL_REGEXP)])],
			'loginPassword': [null, Validators.required]
		});
	}
	
	onSubmit(): void{}
}