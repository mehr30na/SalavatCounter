import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Badge} from "@ionic-native/badge";
import {Vibration} from "@ionic-native/vibration";
import {Shake} from "@ionic-native/shake";
import {AppServiceProvider} from "../../providers/app-service/app-service";
import {Device} from "@ionic-native/device";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  tap: number = 0;
  count: number = this.convertToPersianDigit(0);
  private vibartion: boolean;
  private message: any;

  url = 'https://mehr30na.ir/EhsanBot/public/api/send';

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private storage: Storage,
              private badge: Badge,
              private vibration: Vibration,
              private appService: AppServiceProvider,
              private device: Device,
              private shake: Shake) {

  }

  ngOnInit() {

    this.storage.get('tap').then(res => {
      this.tap = res;
      this.count = this.convertToPersianDigit(this.tap);
    });

    this.storage.get('shake').then(res => {
      if (res == null) {
        this.sendInstallInfo();
        this.storage.set('shake', 'true');
        this.shake.startWatch(19).subscribe(() => {
          this.salavatCount();
        });
      }
      if (res == 'true') {
        this.shake.startWatch(19).subscribe(() => {
          this.salavatCount();
        });
      }
    });
    this.storage.get('vibration').then(res => {
      if (res == null) {
        this.storage.set('vibration', 'true');
        this.vibartion = true;
      }
      if (res == 'true') {
        this.vibartion = true;
      }
    })

  }


  tapEvent(e) {
    this.salavatCount();
  }

  salavatCount() {

    if (this.vibartion) {
      this.vibration.vibrate(90);
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
            this.storage.set('tap', this.tap);
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
    window.open('https://t.me/joinchat/AAAAAEGWaaoO_WQlPIDdXQ', '_blank', 'location=yes');
  }


  sendInstallInfo() {

    this.message = {
      "platform": "" + this.device.platform + "",
      "uuid": "" + this.device.uuid + "",
      "version": "" + this.device.version + "",
      "serial": "" + this.device.serial + "",
      "model": "" + this.device.model + "",
      "manufacturer": "" + this.device.manufacturer + "",
      "cordova": "" + this.device.cordova + "",
      "isVirtual": "" + this.device.isVirtual + ""
    };
    this.appService.save(this.url, this.message).subscribe(res => {
      let alert = this.alertCtrl.create({
        title: 'خوش آمدید!',
        subTitle: 'برای شروع گوشی را تکان دهید یا روی دکمه + بزنید!',
        buttons: ['OK']
      });
      alert.present();
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'خطا!',
        subTitle: <string>error + '' +
        'گوشی به اینترنت متصل نیست...!',
        buttons: ['OK']
      });
      alert.present();
    });

  }


}
