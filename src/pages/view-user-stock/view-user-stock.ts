import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PatchUserStockPage } from "../patch-user-stock/patch-user-stock";
import { AccessProvider } from "../../providers/access/access";

/**
 * Generated class for the ViewUserStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-user-stock',
  templateUrl: 'view-user-stock.html',
})
export class ViewUserStockPage {

  access;
  stockId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accessService: AccessProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.access = this.navParams.get('access');
    this.stockId = this.navParams.get('stockId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUserStockPage');
  }

  ionViewDidEnter(){
    this.updateAccess();
  }

  goToPatchUserStock(access) {
    this.navCtrl.push(PatchUserStockPage, {
      access: access,
      stockId: this.stockId
    });
  }

  updateAccess(){
    this.accessService.getAccess(this.access.id).then((result) => {
      this.access = result;
    });
  }

  deleteUserStock() {
    let alert = this.alertCtrl.create({
      title: 'Suppression utilisateur',
      message: 'Voullez-vous vraiment supprimer ' + this.access.user.firstname + ' ' + this.access.user.name + ' du stock ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
        },
        {
          text: 'Oui',
          handler: () => {
            this.doDeleteUserStock()
          }
        }
      ]
    });
    alert.present();
  }

  doDeleteUserStock() {
    this.accessService.deleteAccess(this.access.id).then((result) =>{
      let successMessage = this.toastCtrl.create({
        message: 'Suppression effectuée avec succès',
        duration: 3000,
        position: 'top'
      });
      successMessage.present();

      this.navCtrl.pop();

    }, (error) => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
