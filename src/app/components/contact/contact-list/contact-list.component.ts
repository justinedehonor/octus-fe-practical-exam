import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model'; 
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  @Input() search_query: string;
  subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.contactService.contactsChanged.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
    this.contacts = this.contactService.getContacts();
  }

}
