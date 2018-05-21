import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { StockProvider } from "../../providers/stock/stock";

/**
 * Generated class for the PatchStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patch-stock',
  templateUrl: 'patch-stock.html',
})
export class PatchStockPage {

  stock;

  patchStockData = {
    name: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public stockService: StockProvider
  ) {
    this.stock = this.navParams.get('stock');
    this.patchStockData.name = this.stock.name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatchStockPage');
  }

  doPatchStock(){
    let loading = this.loadingCtrl.create({
      content: 'Modification des drois en cours'
    });
    loading.present();

    this.stockService.patchStock(this.stock.id, this.patchStockData).then((result) =>{
      console.log(result);
      loading.dismiss();
      this.navCtrl.pop();
      let successToast = this.toastCtrl.create({
        message: 'Modification effectuée avec succès',
        duration: 3000,
        position: 'top'
      });
      successToast.present();
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
