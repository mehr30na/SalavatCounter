import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Badge} from "@ionic-native/badge";
import {Vibration} from "@ionic-native/vibration";
import {Shake} from "@ionic-native/shake";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  tap: number = 0;
  count: number = this.convertToPersianDigit(0);
  private vibartion: boolean;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private storage: Storage,
              private badge: Badge,
              private vibration: Vibration,
              private shake: Shake) {

  }

  ngOnInit() {
    this.storage.get('tap').then(res => {
      this.tap = res;
      this.count = this.convertToPersianDigit(this.tap);
    });

    this.storage.get('shake').then(res => {
      if (res == 'true') {
        this.shake.startWatch(19).subscribe(() => {
          this.salavatCount();
        });
      }
    });
    this.storage.get('vibration').then(res => {
      if (res == 'true'){
        this.vibartion = true;
      }
    })

  }


  tapEvent(e) {
    this.salavatCount();
  }

  salavatCount() {
    if(this.vibartion){
      this.vibration.vibrate(70);
    }
    this.count = this.convertToPersianDigit(this.tap + 1);
    this.tap = this.tap + 1;
    this.storage.set('tap', this.tap);
    this.badge.set(this.tap);
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
            this.badge.clear();
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


  shareApp() {
  }


}
