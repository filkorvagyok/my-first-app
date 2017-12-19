import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

//Ezek alapján vizsgálja meg a validitás ellenőrző, hogy az adott mezőbe e-mail írtunk-e.
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
	selector: 'my-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent{
	emailFormControl = new FormControl('', [
	    Validators.required,
	    Validators.pattern(EMAIL_REGEX)]);
}