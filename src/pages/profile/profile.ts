import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";
import { ProfileProvider } from "../../providers/profile/profile";
import { CreateStockPage } from "../create-stock/create-stock";

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

  profil;

  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    public navCtrl: NavController,
    public profileService: ProfileProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
    this.initializeProfil();
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

  initializeProfil(){
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present();

    this.profileService.getProfil().then((result) => {
      this.profil = result;
      loading.dismiss();
    });
  }

  goToCreateStockPage(){
    this.navCtrl.push(CreateStockPage, {
      user: this.profil.user
    });
  }

}
