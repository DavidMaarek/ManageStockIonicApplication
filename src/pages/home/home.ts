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
      content: 'Chargement de vos stocks'
    });
    loading.present();

    this.stockService.getSegmentsStocks().then((result) => {
      this.stocksName = result;
      for (let stock in this.stocksName) {
        this.stocksName[stock].slug = this.stocksName[stock].id + this.stocksName[stock].name.replace(/ /g,'');
      }
      this.page = this.stocksName[0].slug;
    });

    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
      this.page = this.stocks[0].slug;
      loading.dismiss();
    });
    console.log('Initialize Home');
  }

  updateHome() {
    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
    });
    console.log('Update Home');
  }

  refreshHome(refresher) {
    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
      refresher.complete();
    });
    console.log('Refresh Home');
  }


  // Ajout d'un champs slug car pour les segments il faut une chaine de caratere et non un integer, le slug est donc un identifiant unique d'un stock sous forme de chaine de caractere qui combine l'id du stock et le nom du stock, en supprimant tous les espaces
  addSlug() {
    for (let stock in this.stocks) {
      this.stocks[stock].slug = this.stocks[stock].id + this.stocks[stock].name.replace(/ /g,'');
    }
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
