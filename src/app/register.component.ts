import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
	selector: 'my-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

export class RegisterComponent{
	hide = true;
	emailFormControl = new FormControl('', [
	    Validators.required,
	    Validators.pattern(EMAIL_REGEX)]);
	passwordFormControl = new FormControl('', 
    	Validators.required);
	passwordAgainFormControl = new FormControl('', 
    	Validators.required);
	nameFormControl = new FormControl('', 
    	Validators.required);
}