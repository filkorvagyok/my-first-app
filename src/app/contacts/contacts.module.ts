import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { ContactsComponent }    from './contacts.component';
/*import { ContactDetailComponent }  from './contact-detail.component';
import { ContactCommonComponent }  from './contact-common.component';
import { ContactEditComponent } from './contact-edit.component';*/

import { ContactsService } from './contacts.service';
import { SharedService } from '../shared.service';

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
    /*ContactDetailComponent,
    ContactCommonComponent,
    ContactEditComponent*/
  ],
  providers: [ContactsService, SharedService]
})
export class ContactsModule {}