import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, Slides } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { StockProvider } from "../../providers/stock/stock";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mySlider') slider: Slides;

  selectedSegment;
  stocks;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public stockService: StockProvider,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad(){
    this.initializeHome();
  }

  initializeHome(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement de vos stocks'
    });
    loading.present();

    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      console.log(result);
      loading.dismiss();
    });
  }

  onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.stocks.findIndex((stock) => {
      return stock.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    console.log('Slide changed');
    const currentSlide = this.stocks[slider.activeIndex];
    this.selectedSegment = currentSlide.id;
  }

}
