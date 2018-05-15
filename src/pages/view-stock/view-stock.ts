import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { StockProvider } from "../../providers/stock/stock";
import { ViewUserStockPage } from "../view-user-stock/view-user-stock";
import { AddUserStockPage } from "../add-user-stock/add-user-stock";
import { PatchStockPage } from "../patch-stock/patch-stock";

/**
 * Generated class for the ViewStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-stock',
  templateUrl: 'view-stock.html',
})
export class ViewStockPage {

  stock;
  stockId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public stockService: StockProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.stockId = this.navParams.get('stockId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewStockPage');
    this.initializeViewStock();
  }

  ionViewDidEnter(){
    this.updateViewStock();
  }

  initializeViewStock(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement des informations du stock'
    });
    loading.present();

    this.stockService.getProfileStock(this.stockId).then((result) => {
      this.stock = result;
      loading.dismiss();
    }, (error) => {
      console.log(error);
      loading.dismiss();
    });
  }

  updateViewStock(){
    this.stockService.getProfileStock(this.stockId).then((result) => {
      this.stock = result;
    }, (error) => {
      console.log(error);
    });
  }

  goToAddUserStock(){
    this.navCtrl.push(AddUserStockPage, {
      stockId: this.stockId,
      accesses: this.stock.stockAccesses
    });
  }

  goToUserStock(access){
    this.navCtrl.push(ViewUserStockPage, {
      access: access,
      stockId: this.stockId
    });
  }

  goToPathStock(){
    this.navCtrl.push(PatchStockPage, {
      stock: this.stock
    });
  }

  deleteStock(){
    let alert = this.alertCtrl.create({
      title: 'Suppression du stock',
      message: 'Voullez-vous vraiment supprimer le stock ' + this.stock.name + ' ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
        },
        {
          text: 'Oui',
          handler: () => {
            this.doDeleteStock()
          }
        }
      ]
    });
    alert.present();
  }

  doDeleteStock(){
    this.stockService.deleteStock(this.stockId).then((result) =>{
      let successMessage = this.toastCtrl.create({
        message: 'Suppression effectuée avec succes',
        duration: 3000,
        position: 'top'
      });
      successMessage.present();

      this.navCtrl.pop();

    }, (error) => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
