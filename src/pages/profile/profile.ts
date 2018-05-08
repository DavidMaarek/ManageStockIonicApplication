import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    public navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Déconnexion',
      message: 'Voullez-vous vraiment vous déconnecter ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.doLogout()
          }
        }
      ]
    });
    alert.present();
  }

  doLogout() {
    this.storage.clear().then(() => {
      console.log('clear');
      this.navCtrl.setRoot(LoginPage);
    })
  }

}
