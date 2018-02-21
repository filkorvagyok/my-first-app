import { Router } from '@angular/router';
import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit() {
  }

  createNewItem(): void{
    this.router.navigate(["/people/new"]);
  }

}
