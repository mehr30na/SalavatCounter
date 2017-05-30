import {Component} from '@angular/core';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor() {

  }

  shareApp() {
    window.open('https://t.me/joinchat/AAAAAEGWaaoO_WQlPIDdXQ', '_blank', 'location=yes');
  }

}
