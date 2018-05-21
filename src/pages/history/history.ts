import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Slides } from 'ionic-angular';
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
  @ViewChild('slider') slider: Slides;

  page;

  histories;
  stocksName;

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

  // Ajout d'un champs slug car pour les segments / slides il faut une chaine de caratere et non un integer, le slug est donc un identifiant unique d'un stock sous forme de chaine de caractere qui combine l'id du stock et le nom du stock, en supprimant tous les espaces
  addSlug() {
    for (let stock in this.stocksName) {
      this.stocksName[stock].slug = this.stocksName[stock].id + this.stocksName[stock].name.replace(/ /g,'');
    }
  }

  initializeHistory(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement de l\'historique'
    });
    loading.present();

    this.historyService.getHistories().then((result) => {
      this.histories = result['histories'];
      this.stocksName = result['stocksName'];
      this.addSlug();
      this.page = this.stocksName[0].slug;
      loading.dismiss();
    }, error => {
      console.log(error);
      this.histories = 0;
      loading.dismiss();
    });
  }

  doRefresh(refresher) {
    this.historyService.getHistories().then((result) => {
      // On refreshs seulement les histories car si on refresh aussi le stocksName le segment freeze
      this.histories = result['histories'];
      //this.stocksName = result['stocksName'];
      this.addSlug();
      refresher.complete();
    }, error => {
      console.log(error);
      refresher.complete();
      this.histories = null;
      this.stocksName = null;
    });
  }

}
