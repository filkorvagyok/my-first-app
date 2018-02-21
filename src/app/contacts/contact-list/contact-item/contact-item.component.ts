import { Contact } from './../../../shared/classes/contact';
import { ContactService } from './../../contact.service';
import { Component, OnInit, Input } from '@angular/core';
import { BaseItemComponent } from '../../../shared/services/base/base-item.component';
import { Router } from '@angular/router';

@Component({
  selector: '[app-contact-item]',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent extends BaseItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor(
    protected contactService: ContactService,
    private router: Router
  ) {
    super(contactService);
  }

  navigateToDetail(id: number): void{
    this.router.navigate(['/people/shown', id]);
  }

  ngOnInit() {
  }

}
