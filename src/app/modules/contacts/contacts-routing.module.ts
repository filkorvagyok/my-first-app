import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent }    from './components/contacts/contacts.component';
import { ContactDetailComponent }  from './components/contact-detail/contact-detail.component';
import { ContactCommonComponent }  from './components/contact-common/contact-common.component';

const contactsRoutes: Routes = [
  { path: 'people/list', component:ContactsComponent },
  { path: 'people/shown/:id', component:ContactDetailComponent },
  { path: 'people/edit/:id', component:ContactCommonComponent },
  { path: 'people/new/:array[]:num:rank',  component:ContactCommonComponent },
  { path: 'people/new',  component:ContactCommonComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(contactsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ContactRoutingModule { }