import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, Slides } from "ionic-angular";
import { StockProvider } from "../../providers/stock/stock";
import { AddProductPage } from "../add-product/add-product";
import { ViewProductPage } from "../view-product/view-product";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: number;
  stocks;
  stocksName;
  page;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public stockService: StockProvider,
    public loadingCtrl: LoadingController
  ) {
    this.initializeHome();
  }

  ionViewDidEnter(){
      //this.updateHome();
  }

  initializeHome(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement de vos stocks'
    });
    loading.present();

    this.stockService.getSegmentsStocks().then((result) => {
      this.stocksName = result;
      console.log(this.stocksName);
      for (let stock in this.stocksName) {
        this.stocksName[stock].slug = this.stocksName[stock].id + this.stocksName[stock].name.replace(/ /g,'');
      }
      console.log(this.page);
    });

    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      console.log(this.stocks);
      loading.dismiss();
      this.addSlug();
      this.page = this.stocks[0].slug;
    });
  }

  updateHome(refresher) {
    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
      refresher.complete();
    });
  }

  // Ajout d'un champs slug car pour les segments / slides il faut une chaine de caratere et non un integer, le slug est donc un identifiant unique d'un stock sous forme de chaine de caractere qui combine l'id du stock et le nom du stock, en supprimant tous les espaces
  addSlug() {
    for (let stock in this.stocks) {
      this.stocks[stock].slug = this.stocks[stock].id + this.stocks[stock].name.replace(/ /g,'');
    }
  }

  goToAddProductPage(event) {
    console.log(event);
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
