import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactSearchComponent } from './contact-search/contact-search.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

import { ContactFilterPipe } from '../../pipes/contact-filter.pipe';
import { AuthGuard } from '../../auth-guard.service';


@NgModule({
  declarations: [ContactFilterPipe, ContactListComponent, ContactSearchComponent, ContactItemComponent, ContactEditComponent],
  imports: [CommonModule, FormsModule, ContactRoutingModule, ReactiveFormsModule],
  providers: [AuthGuard],
  exports: [ContactListComponent, ContactSearchComponent]
})
export class ContactModule { }
