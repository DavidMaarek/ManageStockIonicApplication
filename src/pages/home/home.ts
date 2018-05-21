import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from "ionic-angular";
import { StockProvider } from "../../providers/stock/stock";
import { AddProductPage } from "../add-product/add-product";
import { ViewProductPage } from "../view-product/view-product";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  stocks;
  stocksName;
  page;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public stockService: StockProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.initializeHome();
  }

  ionViewWillEnter() {
    this.updateHome();
  }

  initializeHome(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement de vos stocks en cours'
    });
    loading.present();

    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
      // On duplique les stocks pour boucler dessus sur les segments afin de pouvoir raffraichir les données sans celles du stock afin qu'il ne bug pas
      this.stocksName = this.stocks;
      this.page = this.stocks[0].slug;
      loading.dismiss();
    }, error => {
      console.log(error);
      this.stocks = 0;
      loading.dismiss();
    });
  }

  updateHome() {
    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
    }, error => {
      console.log(error);
      this.stocks = null;
    });
  }

  refreshHome(refresher) {
    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
      refresher.complete();
    }, error => {
      console.log(error);
      this.stocks = null;
      refresher.complete();
    });
  }


  // Ajout d'un champs slug car pour les segments il faut une chaine de caratere et non un integer, le slug est donc un identifiant unique d'un stock sous forme de chaine de caractere qui combine l'id du stock et le nom du stock, en supprimant tous les espaces
  addSlug() {
    for (let stock in this.stocks) {
      this.stocks[stock].slug = this.stocks[stock].id + this.stocks[stock].name.replace(/ /g,'');
    }
  }

  onSegmentChange() {
    console.log('Changed');
  }

  goToAddProductPage() {
    this.navCtrl.push(AddProductPage, {
      slug: this.page
    });
  }

  goToViewProductPage(productId, stockAccesses){
    this.navCtrl.push(ViewProductPage, {
      productId: productId,
      stockAccesses: stockAccesses
    });
  }
}
