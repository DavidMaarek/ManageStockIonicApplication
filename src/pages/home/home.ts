import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, Slides } from "ionic-angular";
import { StockProvider } from "../../providers/stock/stock";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: number;
  stocks;
  currentStockId;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public stockService: StockProvider,
    public loadingCtrl: LoadingController
  ) {
    this.initializeHome();
    /*this.stocks = [
      {
        id: "first",
        name: "First Stock",
        products: [
          {
            "id": 3,
            "name": "IP Overview PATCH du soir bonsoir",
            "quantity": 8745
          },
          {
            "id": 4,
            "name": "Super proezregrhduct par David",
            "quantity": 8765
          }
        ]
      },
      {
        id: "second",
        name: "Second Stock",
        products: [
          {
            "id": 3,
            "name": "gfhjk",
            "quantity": 6556
          },
          {
            "id": 4,
            "name": "Super  par David",
            "quantity": 232
          }
        ]
      },
      {
        id: "third",
        name: "Third Stock",
        products: [
          {
            "id": 3,
            "name": "IP Overview PATCH",
            "quantity": 567
          },
          {
            "id": 4,
            "name": "Proezregrhduct par David",
            "quantity": 87
          }
        ]
      }
    ];*/
    //this.selectedSegment = this.stocks[0].id;
    console.log('this.stocks : ', this.stocks);
    console.log('this.selectedSegment : ', this.selectedSegment);
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
      console.log(result);
      loading.dismiss();
      this.addSlug();
      this.selectedSegment = this.stocks[0].slug;
      console.log('this.selectedSegment : ', this.selectedSegment);
    });
  }

  addSlug(){
    for (let stock in this.stocks) {
      this.stocks[stock].slug = this.stocks[stock].id + this.stocks[stock].name.replace(/ /g,'');
    }
    console.log(this.stocks);
  }

  updateHome(){
    this.stockService.getHomeStocks().then((result) => {
      this.stocks = result;
      this.addSlug();
      this.selectedSegment = this.stocks[0].slug;
    });
  }

  onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.stocks.findIndex((slide) => {
      console.log(slide);
      console.log('onSegmentChanged -> segmentButton.value : ', segmentButton.value);
      return slide.slug === segmentButton.value;
    });
    console.log(selectedIndex);
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    console.log('Slide changed');
    const currentSlide = this.stocks[slider.getActiveIndex()];
    this.selectedSegment = currentSlide.slug;
    console.log('onSlideChanged -> this.selectedSegment : ', this.selectedSegment);

    this.currentStockId = currentSlide.id;
    console.log('CurrentstockId', this.currentStockId)
  }


}
