import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, Slides } from "ionic-angular";
import { StockProvider } from "../../providers/stock/stock";
import { AddProductPage } from "../add-product/add-product";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: number;
  stocks;
  currentStockId;

  firstTime: boolean = true;

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

    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      console.log(this.stocks);
      loading.dismiss();
      this.addSlug();
      this.selectedSegment = this.stocks[0].slug;
      this.currentStockId = this.stocks[0].id;
      this.firstTime = false;
    });
  }

  updateHome() {
    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
      this.selectedSegment = this.stocks[0].slug;
      this.currentStockId = this.stocks[0].id;
    });
  }

  // Ajout d'un champs slug car pour les segments / slides il faut une chaine de caratere et non un integer, le slug est donc un identifiant unique d'un stock sous forme de chaine de caractere qui combine l'id du stock et le nom du stock, en supprimant tous les espaces
  addSlug() {
    for (let stock in this.stocks) {
      this.stocks[stock].slug = this.stocks[stock].id + this.stocks[stock].name.replace(/ /g,'');
    }
  }

  goToAddProductPage() {
    this.navCtrl.push(AddProductPage, {
      stockId: this.currentStockId
    });
  }

  onSegmentChanged(segmentButton) {
    const selectedIndex = this.stocks.findIndex((slide) => {
      return slide.slug === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    const currentSlide = this.stocks[slider.getActiveIndex()];

    // test si le currentSlide existe bien, car dans le cas ou l'utilisateur essaie de slider vers la droite quand il est sur le dernier stock ca plante car il essaie de réassigner currentSlide.slug à this.selectedSegment
    if (currentSlide){
      this.selectedSegment = currentSlide.slug;
      this.currentStockId = currentSlide.id;
    }
  }
}
