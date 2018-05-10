import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.access = this.navParams.get('access');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUserStockPage');
  }

  goToPatchUserStock(userId){
    this.navCtrl.push(PatchUserStockPage, {
      userId: userId
    });
  }

}
