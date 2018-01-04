import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { ContactsComponent }    from './components/contacts/contacts.component';
import { ContactDetailComponent }  from './components/contact-detail/contact-detail.component';
import { ContactCommonComponent }  from './components/contact-common/contact-common.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

import { ContactsApiService } from './contacts-api.service';
import { ContactsDataHandler } from './contacts-datahandler.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../shared/services/shared-deletedatahandler.service';
import { SharedAddDataHandler } from '../../shared/services/shared-adddatahandler.service';

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
    ContactDetailComponent,
    ContactCommonComponent,
    ContactEditComponent
  ],
  providers: [ContactsApiService, ContactsDataHandler, SharedGetDataHandler,
  SharedDeleteDataHandler, SharedAddDataHandler]
})
export class ContactsModule {}