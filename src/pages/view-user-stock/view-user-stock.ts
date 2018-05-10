import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatchUserStockPage } from "../patch-user-stock/patch-user-stock";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.access = this.navParams.get('access');
    this.stockId = this.navParams.get('stockId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUserStockPage');
  }

  goToPatchUserStock(access){
    this.navCtrl.push(PatchUserStockPage, {
      access: access,
      stockId: this.stockId
    });
  }

}
