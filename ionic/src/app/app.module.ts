import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from "@ionic/storage";
import {Badge} from "@ionic-native/badge";
import {Vibration} from "@ionic-native/vibration";
import {Shake} from "@ionic-native/shake";
import {SettingPage} from "../pages/setting/setting";
import {BackgroundMode} from "@ionic-native/background-mode";
import {Device} from "@ionic-native/device";
import {AppServiceProvider} from '../providers/app-service/app-service';
import {HttpModule} from "@angular/http";
import {ReportPage} from "../pages/report/report";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingPage,
    ReportPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingPage,
    ReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    Badge,
    Vibration,
    Shake,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppServiceProvider,


  ]
})
export class AppModule {
}
