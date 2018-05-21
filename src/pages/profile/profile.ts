import { Component } from '@angular/core';
import { ActionSheetController, AlertController, App, IonicPage, LoadingController, NavController } from 'ionic-angular';
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

  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    public navCtrl: NavController,
    public profileService: ProfileProvider,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    public actionSheetCtrl: ActionSheetController
  ) {}

  ionViewDidLoad() {
    this.initializeProfil();
  }

  ionViewDidEnter() {
    this.updateProfil();
  }

  initializeProfil() {
    let loading = this.loadingCtrl.create({
      content: 'Chargement de votre profil en cours'
    });
    loading.present();

    this.profileService.getProfil().then((result) => {
      this.profil = result;
      loading.dismiss();
    });
  }

  updateProfil() {
    this.profileService.getProfil().then((result) => {
      this.profil = result;
    });
  }

  settingsActionSheet() {
    let settingsActionSheet = this.actionSheetCtrl.create({
      title: 'Profil',
      buttons: [
        {
          text: 'Déconnexion',
          role: 'destructive',
          handler: () => {
            this.logout();
          }
        },{
          text: 'Modifier mon profil',
          handler: () => {
            this.goToPatchUser();
          }
        },{
          text: 'Annuler',
          role: 'cancel',
        }
      ]
    });
    settingsActionSheet.present();
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
      this.appCtrl.getRootNav().setRoot(LoginPage);
    })
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
