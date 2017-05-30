import {Component} from '@angular/core';
import {MenuController, AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {BackgroundMode} from "@ionic-native/background-mode";
import {Device} from "@ionic-native/device";
import {Storage} from '@ionic/storage';
import {AppServiceProvider} from "../providers/app-service/app-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  message: any;
  url = 'https://mehr30na.ir/EhsanBot/public/api/send';

  constructor(statusBar: StatusBar, splashScreen: SplashScreen,
              menu: MenuController,
              private platform: Platform,
              private backgroundMode: BackgroundMode,
              private device: Device,
              private storage: Storage,
              private appService: AppServiceProvider,
              private alertCtrl: AlertController) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      menu.enable(true);
      this.platform.registerBackButtonAction(() => {
        // let confirm = this.alertCtrl.create({
        //   title: 'خروج از برنامه!',
        //   message: 'اگر از برنامه خارج شوید سنسور حرکتی غیر فعال خواهد شد! آیا از خروج اطمینان دارید؟',
        //   buttons: [
        //     {
        //       text: 'بله',
        //       handler: () => {
        //         console.log('Agree clicked');
        //         this.badge.clear();
        //         this.platform.exitApp();
        //       }
        //     },
        //     {
        //       text: 'خیر',
        //       handler: () => {
        //         console.log('Dissagree clicked');
        //
        //       }
        //     }
        //   ]
        // });
        // confirm.present();
      });
      splashScreen.hide();
      this.backgroundMode.enable();
      this.storage.get('shake').then(res => {
        if (res == null) {
          this.sendInstallInfo();
        } else {
          this.sendRunInfo();
        }
      })
    });
  }


  openPage() {
    // this.navCtrl.push(HomePage);
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
        subTitle: <string>error,
        buttons: ['OK']
      });
      alert.present();
    });

  }

  sendRunInfo() {

    this.message = {
      "uuid": "" + this.device.uuid + "",
      "serial": "" + this.device.serial + "",
      "manufacturer": "" + this.device.manufacturer + ""
    };

    this.appService.save(this.url, this.message).subscribe(res => {
      // let alert = this.alertCtrl.create({
      //   title: 'خوش آمدید!',
      //   subTitle: JSON.stringify(res, null, 2),
      //   buttons: ['OK']
      // });
      // alert.present();
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'خطا!',
        subTitle: <string>error,
        buttons: ['OK']
      });
      alert.present();
    });

  }

}
