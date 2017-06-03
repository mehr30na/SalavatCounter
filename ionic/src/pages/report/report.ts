import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AppServiceProvider} from "../../providers/app-service/app-service";
import {LoadingController} from 'ionic-angular';
import {ReportClass} from "./reportClass";


/**
 * Generated class for the ReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage implements OnInit {

  url: string = 'https://mehr30na.ir/EhsanBot/public/api/countinfo';

  statistics: ReportClass = {
    totalsum: 0,
    todaytotal: 0,
    members: 0,
    CurrentRound: 0,
    remaining: 0,
  };

  code: string;

  constructor(public navCtrl: NavController,
              private appService: AppServiceProvider,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  ngOnInit() {

    this.getStatistics();

  }


  getStatistics() {
    let loader = this.loadingCtrl.create({
      content: "لطفا منتظر بمانید...",
      duration: 5000
    });
    loader.present();
    this.appService.read(this.url).subscribe(res => {
      this.statistics = res;
      loader.dismissAll();
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


  convertToPersianDigit(str) {

    str = str.toString();
    var persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return str.replace(/[0-9]/g, function (w) {
      return persianNumbers[+w];
    });

  }


}
