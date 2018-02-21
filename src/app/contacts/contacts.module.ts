import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactsComponent } from './contacts.component';
import { ContactItemComponent } from './contact-list/contact-item/contact-item.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactService } from './contact.service';

import { ContactsApiService } from './../modules/contacts/contacts-api.service';
import { SharedGetDataHandler } from '../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../shared/services/shared-deletedatahandler.service';
import { SharedAddDataHandler } from '../shared/services/shared-adddatahandler.service';

import { ContactRoutingModule } from './contacts-routing.module';

import {
  MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule,
  MatButtonModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ContactsComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactDetailComponent,
    ContactEditComponent
  ],
  providers: [ContactsApiService, SharedGetDataHandler,
  SharedDeleteDataHandler, SharedAddDataHandler, ContactService]
})
export class ContactsModule {}