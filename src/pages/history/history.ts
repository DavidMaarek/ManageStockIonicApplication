import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from "../../providers/history/history";

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  stocks;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public historyService: HistoryProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.initializeHistory();
  }

  initializeHistory(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement de l\'historique des retraits'
    });
    loading.present();

    this.historyService.getHistories().then((result) => {
      this.stocks = result;
      console.log(this.stocks);
      loading.dismiss();
    });
  }

}
