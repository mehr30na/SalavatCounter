import {Component} from '@angular/core';
import {MenuController, AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {BackgroundMode} from "@ionic-native/background-mode";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(statusBar: StatusBar, splashScreen: SplashScreen,
              menu: MenuController,
              private platform: Platform,
              private backgroundMode: BackgroundMode,
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
    });
  }


  openPage() {
    // this.navCtrl.push(HomePage);
  }


}
