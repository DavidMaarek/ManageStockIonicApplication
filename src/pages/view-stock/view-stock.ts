import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { StockProvider } from "../../providers/stock/stock";
import { ViewUserStockPage } from "../view-user-stock/view-user-stock";
import { AddUserStockPage } from "../add-user-stock/add-user-stock";

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
    public stockService: StockProvider
  ) {
    this.stockId = this.navParams.get('stockId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewStockPage');
    this.initializeViewStock();
  }

  initializeViewStock(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement des informations du stock'
    });
    loading.present();

    this.stockService.getProfileStock(this.stockId).then((result) =>{
      this.stock = result;
      loading.dismiss();
    }, (error) => {
      console.log(error);
      loading.dismiss();
    });
  }

  goToAddUserStock(){
    this.navCtrl.push(AddUserStockPage, {
      stockId: this.stockId
    });
  }

  goToUserStock(access){
    this.navCtrl.push(ViewUserStockPage, {
      access: access,
      stockId: this.stockId
    });
  }
}
