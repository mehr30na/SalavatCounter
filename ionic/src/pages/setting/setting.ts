import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage implements OnInit {
  private vibrateStatus: boolean;
  private shakeStatus: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  ngOnInit() {
    this.storage.get('vibration').then(res => {
      this.vibrateStatus = res;
    });
    this.storage.get('shake').then(res => {
      this.shakeStatus = res;
    })
  }

  vibrateSetting(event) {

    if (event.checked) {
      this.storage.remove('vibration');
      this.storage.set('vibration', 'true');
    } else {
      this.storage.remove('vibration');
      this.storage.set('vibration', 'false');
    }

  }

  shakeSetting(event) {

    if (event.checked) {
      this.storage.remove('shake');
      this.storage.set('shake', 'true');
    } else {
      this.storage.remove('shake');
      this.storage.set('shake', 'false');
    }

  }

}
