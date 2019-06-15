import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {

  @Input() contact: Contact;

  constructor(private router: Router, private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
  }

  onEditContact() {
    this.router.navigate(['edit', this.contact.id], { relativeTo: this.route })
  }

  onDeleteContact() {
    if (confirm(`Are you sure you want to delete the contact: ${this.contact.name} ?`)) {
      this.contactService.deleteContact(this.contact.id);
      this.router.navigate(['/'], { relativeTo: this.route });
    }
  }

}
