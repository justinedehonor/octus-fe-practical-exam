export class Contact {
  public id: number;
  public name: string;
  public contact_no: string;
  public email: string

  constructor(id: number, name: string, contact_no: string, email: string) {
    this.id = id;
    this.name = name;
    this.contact_no = contact_no;
    this.email = email;
  }
}