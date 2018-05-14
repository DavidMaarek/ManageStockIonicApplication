import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";
import { ProfileProvider } from "../../providers/profile/profile";
import { CreateStockPage } from "../create-stock/create-stock";
import { ViewStockPage } from "../view-stock/view-stock";
import { PatchUserPage } from "../patch-user/patch-user";

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

  stockId;

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

   ionViewDidEnter(){
     this.updateProfil();
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

  updateProfil(){
    this.profileService.getProfil().then((result) => {
      this.profil = result;
    });
  }

  goToPatchUser(){
    this.navCtrl.push(PatchUserPage, {
      user: this.profil.user
    });
  }

  goToCreateStockPage(){
    this.navCtrl.push(CreateStockPage, {
      user: this.profil.user
    });
  }

  goToViewStock(stockId){
    this.navCtrl.push(ViewStockPage, {
      stockId: stockId
    });
  }

}
