import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsChanged = new Subject<Contact[]>();

  private contacts = [
    {
      id: 0,
      name: 'John Smith',
      contact_no: '+65 9825 7805',
      email: 'john.smith@email.com'
    },
    {
      id: 1,
      name: 'Maria Johnson',
      contact_no: '+65 8464 6929',
      email: 'maria.johnson@email.com'
    }
  ];

  private nextId: number;

  constructor() {
    let contacts = this.getContacts();
    if (contacts.length === 0) {
      this.nextId = 0;
    } else {
      let maxId = contacts[contacts.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  checkIfDuplicate(contact: Contact) {
    let contacts = this.getContacts();
    return contacts.find((c: Contact) => {
      return c.contact_no.toLowerCase() === contact.contact_no || c.email.toLowerCase() === contact.email.toLowerCase()
    });
  }

  checkIfExists(id: number) {
    let contacts = this.getContacts();
    return contacts.find((c: Contact) => {
      return c.id == id;
    });
  }

  getContacts() {
    let localStorageItem = JSON.parse(localStorage.getItem('contacts'));
    return localStorageItem === null ? [] : localStorageItem.contacts;
  }

  setLocalStorageContacts(contacts: Contact[]) {
    localStorage.setItem('contacts', JSON.stringify({ contacts }));
  }

  getContact(id: number) {
    let contacts = this.getContacts();
    return contacts.find((c: Contact) => {
      return c.id === id
    });
  }

  updateContact(id: number, contact: Contact) {
    let contacts = this.getContacts();
    let index = contacts.findIndex((c: Contact) => {
      return c.id === id;
    })
    contacts[index] = new Contact(id, contact.name, contact.contact_no, contact.email);
    this.setLocalStorageContacts(contacts);
  }

  addContact(contact: Contact) {
    let newContact = new Contact(this.nextId, contact.name, contact.contact_no, contact.email);
    let contacts = this.getContacts();
    contacts.push(newContact);
    this.setLocalStorageContacts(contacts);
    this.nextId++;
    this.contactsChanged.next(contacts);
  }

  deleteContact(id: number) {
    let contacts = this.getContacts();
    let index = contacts.findIndex((c: Contact) => {
      return c.id === id
    });
    contacts.splice(index, 1);
    this.setLocalStorageContacts(contacts);
    this.contactsChanged.next(contacts);
  }
}
