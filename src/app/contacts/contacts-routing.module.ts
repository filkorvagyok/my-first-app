import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent }    from './contacts.component';
import { ContactDetailComponent }  from './contact-detail.component';
import { ContactCommonComponent }  from './contact-common.component';

const contactsRoutes: Routes = [
  { path: 'people/list', component:ContactsComponent },
  { path: 'people/shown/:id', component:ContactDetailComponent },
  { path: 'people/edit/:id', component:ContactCommonComponent },
  { path: 'people/new/:companies[]',  component:ContactCommonComponent },
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