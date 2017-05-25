import {Component} from '@angular/core';
import {MenuController, AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BackgroundMode} from '@ionic-native/background-mode';


import {TabsPage} from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(statusBar: StatusBar, splashScreen: SplashScreen,
              menu: MenuController,
              private backgroundMode: BackgroundMode,
              private platform: Platform,
              private alertCtrl: AlertController) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      menu.enable(true);
      this.backgroundMode.enable();
    });
  }


  openPage() {
    // this.navCtrl.push(HomePage);
  }


  appExit() {
    let confirm = this.alertCtrl.create({
      title: 'خروج از برنامه!',
      message: 'آیا از خروج اطمینان دارید؟',
      buttons: [
        {
          text: 'بله',
          handler: () => {
            console.log('Agree clicked');
            this.platform.exitApp();
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


}
