import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
	selector: 'my-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent{
	hide = true;
	emailFormControl = new FormControl('', [
	    Validators.required,
	    Validators.pattern(EMAIL_REGEX)]);
    passwordFromControl = new FormControl('', 
    	Validators.required);	
}