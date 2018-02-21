import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

const contactsRoutes: Routes = [
  { path: 'people/list', component:ContactsComponent },
  { path: 'people/shown/:id', component:ContactDetailComponent },
  { path: 'people/edit/:id', component:ContactEditComponent },
  { path: 'people/new/:array[]:num:rank',  component:ContactEditComponent },
  { path: 'people/new',  component:ContactEditComponent }
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