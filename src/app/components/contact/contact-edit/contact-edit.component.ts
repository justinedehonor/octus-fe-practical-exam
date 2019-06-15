import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contact_form: FormGroup;
  editMode = false;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let email = '';
    let contact_no = '';

    if (this.editMode) {
      const contact = this.contactService.getContact(this.id);
      name = contact.name;
      email = contact.email;
      contact_no = contact.contact_no;
    }

    this.contact_form = new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.pattern(/^(?:([a-zA-Z]{2,4}\.){0,1} ?([a-zA-Z]{2,24})) ([a-zA-Z]{1,1}\. ){0,1}([a-zA-Z]{2,24} ){0,2}([A-Za-z']{2,24})((?:, ([a-zA-Z]{2,5}\.?)){0,4}?)$/)]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      contact_no: new FormControl(contact_no, [Validators.required, Validators.pattern(/^\+\d{2} \d{4} \d{4}$/)])
    });

  }

  onSaveContact() {
    if (this.contact_form.invalid) {
      this.markFormGroupTouched(this.contact_form);
      return;
    }

    if (this.editMode) {
      this.contactService.updateContact(this.id, this.contact_form.value);
    } else {
      if (this.contactService.checkIfDuplicate(this.contact_form.value)) {
        alert('Another contact with the same email or phone number exists! Please edit the existing record.');
        return;
      }
      this.contactService.addContact(this.contact_form.value);
    }
    this.router.navigate(['/'], { relativeTo: this.route });

  }

  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
