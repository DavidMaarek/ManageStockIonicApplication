import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { StockProvider } from "../../providers/stock/stock";
import { ViewStockPage } from "../view-stock/view-stock";

/**
 * Generated class for the CreateStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-stock',
  templateUrl: 'create-stock.html',
})
export class CreateStockPage {

  stockData = {
    name: null,
    stockAccesses: [
      {
        role: 0, // À la création du stock le créateur est forcement au plus au niveau d'access => 0
        user: null
      }
    ]
  };

  user;

  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public stockService: StockProvider,
    public toastCtrl: ToastController,
  ) {
    // On récupere les donnes du user
    this.user = this.navParams.get('user');
    // On assigne le user au stockAccesses
    this.stockData.stockAccesses[0].user = this.user.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateStockPage');
  }


  doCreateStock() {
    let loading = this.loadingCtrl.create({
      content: 'Création du stock en cours'
    });
    loading.present();

    this.stockService.createStock(this.stockData).then((result) =>{
      this.data = result;
      loading.dismiss();
      console.log(this.data);
      this.navCtrl.push(ViewStockPage, {
        stockId: this.data
      }).then(() => { // Afin de supprimer de l'historique la page, comme ca lorsque l'utilisateur revient en arriere il ne tombe par sur la page de création du stock
        let index = 1;
        this.navCtrl.remove(index);
      });
    }, (error) => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: 'top'
      });
      loading.dismiss();
      toast.present();
    });
  }
}
