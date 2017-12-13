import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { ContactsComponent }    from './components/contacts/contacts.component';
import { ContactDetailComponent }  from './components/contact-detail/contact-detail.component';
import { ContactCommonComponent }  from './components/contact-common/contact-common.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

import { ContactsService } from './contacts.service';
import { SharedService } from '../../shared/services/shared.service';

import { ContactRoutingModule } from './contacts-routing.module';

import {
  MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule,
  MatTableModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatRadioModule,
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
  providers: [ContactsService, SharedService]
})
export class ContactsModule {}