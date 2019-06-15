import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../components/contact/contact.model';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(contacts: Contact[], search_query: string) {
    if (!search_query) return contacts;
    let filteredContacts = contacts.filter(c => {
      if (c.name.toLowerCase().indexOf(search_query.toLowerCase()) !== -1 ||
        c.contact_no.indexOf(search_query.toLowerCase()) !== -1 ||
        c.email.indexOf(search_query.toLowerCase()) !== -1) {
        return c;
      }
    });
    return filteredContacts;
  }

}
