import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tap: number = 0;
  count: number = this.convertToPersianDigit(0);

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              ) {

  }


  tapEvent(e) {

    this.count = this.convertToPersianDigit(this.tap + 1);
    this.tap = this.tap + 1;


  }

  pressEvent(e) {

    let confirm = this.alertCtrl.create({
      title: 'صفر کردن شمارنده!',
      message: 'آیا از صفر کردن شمارنده اطمینان دارید؟',
      buttons: [
        {
          text: 'بله',
          handler: () => {
            console.log('Agree clicked');
            this.tap = 0;
            this.count = this.convertToPersianDigit(this.tap);
          }
        },
        {
          text: 'خیر',
          handler: () => {
            console.log('Dissagree clicked');

          }
        }
      ]
    });
    confirm.present();
  }

  convertToPersianDigit(str) {

    str = str.toString();
    var persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return str.replace(/[0-9]/g, function (w) {
      return persianNumbers[+w];
    });

  }


}
